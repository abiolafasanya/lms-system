module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next',
    'prettier',
    'next/core-web-vitals',
    'plugin:@next/next/recommended',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react-hooks', 'react'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-unescaped-entities': 'warn',
    '@next/next/no-page-custom-font': 'warn',
    'react/react-in-jsx-scope': 'off',
  },
  ignorePatterns: ['./src/components/**/*.{ts,tsx}'],
};
