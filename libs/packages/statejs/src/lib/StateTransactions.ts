/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Transaction, TransactionDiff } from './types'

export interface Transactions<T> {
  totalTransactions: number
  addTransaction(snapshot: T): void
  getLastTransaction(): Transaction<T> | null
  getAllTransactions(): Transaction<T>[]
  getTransactionByNumber(transactionNumber: number): Transaction<T> | null
  getLastDiff(): TransactionDiff<T> | null
  getDiffBetween(transactionA: number, transactionB: number): TransactionDiff<T> | null
}

export class StateTransactions<T> implements Transactions<T> {
  constructor(maxLength: number) {
    this.addTransaction = this.addTransaction.bind(this)
    this.getLastTransaction = this.getLastTransaction.bind(this)
    this.getAllTransactions = this.getAllTransactions.bind(this)
    this.getTransactionByNumber = this.getTransactionByNumber.bind(this)
    this.getLastDiff = this.getLastDiff.bind(this)
    this.getDiffBetween = this.getDiffBetween.bind(this)

    this.#maxLength = maxLength > 2 ? maxLength : 2
  }

  #transactions: Map<number, Transaction<T>> = new Map()
  #transactionCounter = 1
  #maxLength: number

  get totalTransactions(): number {
    return this.#transactionCounter
  }

  addTransaction(snapshot: T): void {
    const number = this.#transactionCounter++
    const timestamp = Date.now()
    const transaction: Transaction<T> = {
      number,
      snapshot: JSON.parse(JSON.stringify(snapshot)),
      timestamp,
    }

    if (this.#transactions.size >= this.#maxLength) {
      const oldestTransactionNumber = Array.from(this.#transactions.keys())[0]
      this.#transactions.delete(oldestTransactionNumber)
    }

    this.#transactions.set(number, transaction)
  }

  getLastTransaction(): Transaction<T> | null {
    return this.#transactions.size > 0
      ? JSON.parse(JSON.stringify(Array.from(this.#transactions.values()))).pop()
      : null
  }

  getAllTransactions(): Transaction<T>[] {
    return JSON.parse(JSON.stringify(Array.from(this.#transactions.values())))
  }

  getTransactionByNumber(number: number): Transaction<T> | null {
    return JSON.parse(JSON.stringify(this.#transactions.get(number))) || null
  }

  getLastDiff(): TransactionDiff<T> | null {
    const transactionsArray = JSON.parse(JSON.stringify(Array.from(this.#transactions.values())))
    const length = transactionsArray.length
    if (length < 2) {
      return null
    }

    const oldSnapshot = transactionsArray[length - 2].snapshot
    const newSnapshot = transactionsArray[length - 1].snapshot

    return { old: oldSnapshot, new: newSnapshot }
  }

  getDiffBetween(transactionA: number, transactionB: number): TransactionDiff<T> | null {
    if (transactionA >= transactionB) {
      throw new Error('transactionA must be less than transactionB')
    }

    const oldTransaction = this.#transactions.get(transactionA)
    const newTransaction = this.#transactions.get(transactionB)

    if (!oldTransaction || !newTransaction) {
      return null
    }

    return JSON.parse(
      JSON.stringify({
        old: oldTransaction.snapshot,
        new: newTransaction.snapshot,
      })
    )
  }
}
