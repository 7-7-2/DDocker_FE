module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'react-app',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh', 'prettier', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': 'error',
    '@typescript-eslint/interface-name-prefix': 'on',
    '@typescript-eslint/explicit-function-return-type': 'on',
    '@typescript-eslint/explicit-module-boundary-types': 'on',
    '@typescript-eslint/no-explicit-any': 'on'
  }
};
