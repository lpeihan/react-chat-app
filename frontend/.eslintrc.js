module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true
  },
  extends: [
    'standard',
    'standard-react'
  ],
  plugins: [
    'react'
  ],
  rules: {
    'semi': [2, 'always'],
    'space-before-function-paren': 0,
    'generator-star-spacing': 0,
    'no-return-assign': 0,
    'jsx-quotes': [2, 'prefer-double'],
    'react/jsx-curly-spacing': 0,
    'react/jsx-no-bind': 0,
    'react/jsx-boolean-value': 0,
    'react/self-closing-comp': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}