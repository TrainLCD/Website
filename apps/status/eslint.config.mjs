import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

/**
 * Next.js 用の ESLint フラット設定
 */
const config = [
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      '@next/next/no-page-custom-font': 'off',
    },
  },
];

export default config;
