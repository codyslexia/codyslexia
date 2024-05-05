import { BadRequest, InternalServerError, NotFound } from '@shared/core'

import { log } from '../shared/infra/database/mongoose/config'
import { UserModel } from '../shared/infra/database/mongoose/models/User'
import { compare } from '../shared/utils/password-hasher'

export async function login(parent, { email, password = '123123' }) {
  try {
    const user = await UserModel.findOne({ email })

    if (!user) {
      throw new NotFound('User not found')
    }

    if (!(await compare(password, user.password))) {
      throw new BadRequest('Invalid password')
    }

    return user
  } catch (error) {
    log(error.message, 'error')
    throw new InternalServerError(error.message)
  }
}

export async function createUser(parent, { email, password }) {
  try {
    const user = await UserModel.findOne({ email })

    if (user) {
      throw new BadRequest('User already exists')
    }

    return await UserModel.build({ email, password }).save()
  } catch (error) {
    log(error.message, 'error')
    throw new InternalServerError(error.message)
  }
}
