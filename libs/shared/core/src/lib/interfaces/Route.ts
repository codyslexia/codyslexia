/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { RequestHandler } from './RequestHandler'
import { RequestMethod } from '../enums/RequestMethod'

/**
 * Represents an HTTP endpoint that can handle requests for a specific URI.
 * @template URI The type of the URI that this endpoint handles.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Route<URI extends string = any> {
  path: URI
  method: RequestMethod
  handler: RequestHandler
  version?: string
  middleware?: RequestHandler[]
  description?: string
}
