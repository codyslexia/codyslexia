/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const identifier = (prefix: string) =>
  `${prefix}_${Math.round(Math.random() * 1000000000000)}`

export enum IdentifierKind {
  Customer = 'cus',
  Product = 'prod',
  Plan = 'plan',
  Subscription = 'sub',
}
