/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['next/core-web-vitals'],
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  rules: {
    '@next/next/no-page-custom-font': 'off',
  },
};
