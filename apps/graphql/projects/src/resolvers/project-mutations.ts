import { InternalServerError } from '@shared/core'

import { log } from '../shared/infra/database/mongoose/config'
import { ProjectModel } from '../shared/infra/database/mongoose/models/Project'

export async function createProject(parent, { name, kind, userId, environment, description }) {
  try {
    return await ProjectModel.build({ name, kind, userId, environment, description }).save()
  } catch (error) {
    log(error.message, 'error')
    throw new InternalServerError(error.message)
  }
}
