module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    semi: ['error', 'always'],
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'never'
    }],
    'template-curly-spacing': ['error', 'always'],
    yoda: ['error', 'never'],
    'no-unneeded-ternary': 'off'
  }
};
