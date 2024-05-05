import { InternalServerError } from '@shared/core'

import { log } from '../shared/infra/database/mongoose/config'
import { ProjectModel } from '../shared/infra/database/mongoose/models/Project'
import mongoose from 'mongoose'

/**
 * Returns the current user.
 */
export async function projects() {
  try {
    const projects = await mongoose.connection.db.collection('projects').find().toArray()

    const populated = projects.map(async (project) => {
      const user = await mongoose.connection.db.collection('users').findOne({ _id: project.userId })
      return {
        ...project,
        id: project._id,
        user,
      }
    })

    return populated
  } catch (error) {
    log(error.message, 'error')
    throw new InternalServerError(error.message)
  }
}

/**
 * Returns the project by id.
 */
export async function project(parent, { id }) {
  try {
    return await ProjectModel.findById(id)
  } catch (error) {
    log(error.message, 'error')
    throw new InternalServerError(error.message)
  }
}
