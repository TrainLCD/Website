module.exports = {
  root: true,
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['only-warn'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  rules: {
    'no-unused-vars': 'off',
  },
};
