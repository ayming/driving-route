// ESLint configuration
// http://eslint.org/docs/user-guide/configuring
module.exports = {
  extends: ['react-app', 'prettier', 'prettier/flowtype', 'prettier/react'],
  plugins: ['prettier'],
  globals: {
    google: false,
    __DEV__: false,
  },
  env: {
    browser: true,
  },
  rules: {
    // ESLint plugin for prettier formatting
    // https://github.com/prettier/eslint-plugin-prettier
    'prettier/prettier': [
      'error',
      {
        // https://github.com/prettier/prettier#options
        semi: false,
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
  },
}
