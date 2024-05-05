import { InternalServerError } from '@shared/core'

import { log } from '../shared/infra/database/mongoose/config'
import { UserModel } from '../shared/infra/database/mongoose/models/User'

/**
 * Returns the current user.
 */
export async function me(parent, args, { auth }, info) {
  try {
    // TODO: @moatorres - Remove hardcoded user id and use jwt claims
    return await UserModel.findById(auth?.userId ?? '6636b9d0d2885f0f577a907f')
  } catch (error) {
    log(error.message, 'error')
    throw new InternalServerError(error.message)
  }
}

/**
 * Returns a list of users.
 */
export async function users() {
  try {
    // TODO: @moatorres - Add pagination
    return await UserModel.find()
  } catch (error) {
    log(error.message, 'error')
    throw new InternalServerError(error.message)
  }
}
