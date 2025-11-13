import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import astroPlugin from 'eslint-plugin-astro';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const scopePatterns = (patterns = ['**/*'], basePath) =>
  patterns.map((pattern) => {
    const negated = pattern.startsWith('!');
    const raw = negated ? pattern.slice(1) : pattern;
    const scoped = raw.startsWith(basePath)
      ? raw
      : path.posix.join(basePath, raw);
    return negated ? `!${scoped}` : scoped;
  });

const scopedNextConfigs = nextCoreWebVitals.map((config, index) => {
  const scopedConfig = {
    ...config,
    name: config.name ? `status:${config.name}` : `status:next-${index}`,
  };

  if (config.files && config.files.length > 0) {
    scopedConfig.files = scopePatterns(config.files, 'apps/status');
  } else if (!config.ignores) {
    scopedConfig.files = ['apps/status/**/*'];
  }

  if (config.ignores) {
    scopedConfig.ignores = scopePatterns(config.ignores, 'apps/status');
  }

  return scopedConfig;
});

const astroRecommended = (astroPlugin.configs['flat/recommended'] ?? []).map((config, index) => ({
  ...config,
  name: config.name ? `lp:${config.name}` : `lp:astro-${index}`,
  files: scopePatterns(config.files ?? ['**/*.astro'], 'apps/lp'),
}));

const tsNoUndefOverride = {
  files: ['**/*.{ts,tsx}'],
  rules: {
    'no-undef': 'off',
  },
};

const baseCompatConfigs = compat.config({
  extends: ['@repo/eslint-config/library.js'],
});

const scopedBaseConfigs = baseCompatConfigs.map((config) => ({
  ...config,
  files: ['**/*.{js,jsx,ts,tsx,cjs,mjs}'],
}));

const lpTsCompat = compat.config({
  overrides: [
    {
      files: ['apps/lp/**/*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        project: false,
        tsconfigRootDir: path.join(__dirname, 'apps/lp'),
      },
      extends: ['plugin:@typescript-eslint/recommended'],
    },
  ],
});

const statusRuleOverrides = {
  name: 'status:custom-rules',
  files: ['apps/status/**/*.{js,jsx,ts,tsx}'],
  rules: {
    '@next/next/no-page-custom-font': 'off',
  },
};

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/.turbo/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/.vercel/**',
      'apps/lp/.astro/**',
    ],
  },
  ...scopedBaseConfigs,
  tsNoUndefOverride,
  ...lpTsCompat,
  ...scopedNextConfigs,
  statusRuleOverrides,
  ...astroRecommended,
];
