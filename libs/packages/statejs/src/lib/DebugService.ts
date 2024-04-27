/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Debug } from './types'
import { StateTransactions } from './StateTransactions'

export class DebugService<T> implements Debug<T> {
  constructor(transactionService: StateTransactions<T>) {
    this.transactionService = transactionService
  }

  transactionService: StateTransactions<T>
}
