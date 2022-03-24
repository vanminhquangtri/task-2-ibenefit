module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  plugins: ['prettier', 'react'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  rules: {
    'no-unused-vars': 'warn',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': [
      'warn',
      {
        semi: true,
        tabWidth: 2,
        jsxBracketSameLine: true,
        endOfLine: 'auto',
        printWidth: 80,
        eqeqeq: true,
        singleQuote: true,
        curly: 'error',
        quotes: ['error', 'double'],
      },
    ],
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
  },
};
