module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2020: true,
    jest: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off', // 允许使用@ts-ignore
    '@typescript-eslint/ban-types': 'off',
    'prettier/prettier': ['off', { singleQuote: true }]
    // '@typescript-eslint/no-unused-vars': 'off' // 是否检查未使用变量
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts', '*.tsx']
      // rules: {
      //   '@typescript-eslint/explicit-module-boundary-types': 'warn'
      // }
    }
  ]
}
