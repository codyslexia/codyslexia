/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { identifier } from '@shared/utils'

export const Query = {
  me() {
    return { id: identifier('usr'), email: 'john@example.com' }
  },
  users() {
    return [
      { id: identifier('usr'), email: 'matt@example.com' },
      { id: identifier('usr'), email: 'russ@example.com' },
    ]
  },
}

export const Mutation = {
  login(_, { email }) {
    return { id: identifier('usr'), email }
  },
  createUser(_, { email }) {
    return { id: identifier('usr'), email }
  },
}

export const User = {
  __resolveReference(user: { id: string; email?: string }, { fetchUserById }) {
    return fetchUserById(user.id)
  },
}
