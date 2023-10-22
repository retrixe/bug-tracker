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
  overrides: [
    {
      extends: ['standard-with-typescript'],
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: { project: './tsconfig.json' },
      rules: {
        // Make TypeScript ESLint less strict.
        '@typescript-eslint/no-confusing-void-expression': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/triple-slash-reference': 'off',
        '@typescript-eslint/no-dynamic-delete': 'off'
      }
    }
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }]
  }
}
