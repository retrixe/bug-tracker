module.exports = {
  env: {
    es2021: true,
    node: true,
    browser: true
  },
  globals: { connection: 'writable', db: 'writable' },
  extends: [
    'plugin:@next/next/recommended',
    'plugin:react/recommended',
    'standard',
    'standard-jsx',
    'standard-react'
  ],
  plugins: ['react', 'react-hooks'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: { jsx: true, impliedStrict: true }
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }]
  }
}
