import { RULE_NAME as exampleName, rule as example } from './rules/example'
/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { RULE_NAME as namingName, rule as naming } from './rules/naming'
import { RULE_NAME as copyrightName, rule as copyright } from './rules/copyright'

export default {
  rules: {
    [namingName]: naming,
    [copyrightName]: copyright,
    [exampleName]: example,
  },
}
