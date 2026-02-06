//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    ignores: ['.output/**'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
]
