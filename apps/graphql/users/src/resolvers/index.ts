/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { UserModel } from '../shared/infra/database/mongoose/models/User'

export * as Query from './user-queries'
export * as Mutation from './user-mutations'

export const User = {
  __resolveReference: async function (user, { fetchUserById }) {
    // return fetchUserById(user.id)
    return await UserModel.findById(user.id)
  },
}
