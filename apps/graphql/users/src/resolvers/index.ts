/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export * as Query from './user-queries'
export * as Mutation from './user-mutations'

export const User = {
  __resolveReference(user: { id: string; email?: string }, { fetchUserById }) {
    return fetchUserById(user.id)
  },
}
