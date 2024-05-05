import { BadRequest, InternalServerError } from '@shared/core'

import { log } from '../shared/infra/database/mongoose/config'
import { ProjectModel } from '../shared/infra/database/mongoose/models/Project'
import mongoose from 'mongoose'

export async function createProject(
  parent,
  { input: { name, kind, userId, environment, description } }
) {
  try {
    const user = await mongoose.connection.db
      .collection('users')
      .findOne({ _id: new mongoose.Types.ObjectId(userId) })

    if (!user) {
      throw new BadRequest('User not found')
    }

    const existingProject = await ProjectModel.exists({ userId, name })

    if (existingProject) {
      throw new BadRequest('Project already exists')
    }

    const project = await ProjectModel.build({
      name,
      kind,
      userId,
      environment,
      description,
    }).save()

    return { ...project.toObject(), id: project._id, user: { ...user, id: userId } }
  } catch (error) {
    log(error.message, 'error')
    throw new InternalServerError(error.message)
  }
}
