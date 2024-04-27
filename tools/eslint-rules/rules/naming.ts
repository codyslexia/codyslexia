/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ESLintUtils } from '@typescript-eslint/utils'

/** @note The rule will be available in ESLint configs as `@nx/workspace-naming` */
export const RULE_NAME = 'naming'

/**
 * ESLint Rule's custom logic will live within the `create()` method below.
 *
 * @see https://eslint.org/docs/developer-guide/working-with-rules
 * @see https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/rules
 */
export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: ``,
      recommended: 'recommended',
    },
    schema: [],
    messages: {},
  },
  defaultOptions: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(context) {
    return {}
  },
})
