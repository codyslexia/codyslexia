/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TSESLint } from '@typescript-eslint/utils'
import { rule, RULE_NAME } from './copyright'

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
})

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      code: `/**
* Copyright (c) 2023-2024 Codyslexia
* @license MIT
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

const example = true;`,
    },
  ],
  invalid: [
    {
      code: `const example = true;`,
      errors: [
        {
          messageId: 'missingLicenseHeader' as never,
        },
      ],
      output: `/**
* Copyright (c) 2023-2024 Codyslexia
* @license MIT
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

const example = true;`,
    },
  ],
})
