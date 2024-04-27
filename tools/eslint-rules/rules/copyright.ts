/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { normalizePath } from '@nx/devkit'
import { ESLintUtils } from '@typescript-eslint/utils'

/** @note The rule will be available in ESLint configs as `@nx/workspace-copyright` */
export const RULE_NAME = 'copyright'

/**
 * Checks for the presence of a valid license header at the top of the file.
 * ESLint Rule's custom logic will live within the `create()` method below.
 *
 * @see https://eslint.org/docs/developer-guide/working-with-rules
 * @see https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/rules
 */
export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Checks for the presence of a valid license header at the top of the file.',
      recommended: 'recommended',
    },
    fixable: 'code',
    schema: [],
    messages: {
      missingLicenseHeader: 'Missing license header',
    },
  },
  defaultOptions: [],
  // custom eslint rule to check the presence of a valid license header at the top of the file
  create: function (context) {
    const sourceCode = context.sourceCode
    console.log('sourceCode', sourceCode)
    const comments = sourceCode.getAllComments()
    const licenseText = `/**
* Copyright (c) 2023-2024 Codyslexia
* @license MIT
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/\n`

    return {
      Program: function (node) {
        if (comments.length === 0 || comments[0].value !== licenseText) {
          context.report({
            node: node,
            messageId: 'missingLicenseHeader' as never,
            fix: function (fixer) {
              return fixer.insertTextBefore(node, licenseText + '\n')
            },
          })
        }
      },
    }
  },
})
