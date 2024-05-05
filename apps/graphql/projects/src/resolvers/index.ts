/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ProjectModel } from '../shared/infra/database/mongoose/models/Project'

export * as Query from './project-queries'
export * as Mutation from './project-mutations'

export enum ProjectKind {
  WEB = 'web',
  MOBILE = 'mobile',
  API = 'api',
}

export enum ProjectEnvironment {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export const Project = {
  __resolveReference: async function (project, { fetchProjectById }) {
    return await ProjectModel.findById(project.id)
  },
}

export const User = {
  projects: async function (user, { fetchProjectsByUserId }) {
    const projects = await ProjectModel.find({ userId: user.id })
    const populated = projects.map((project) => ({ ...project.toObject(), id: project._id, user }))
    return populated
  },
}
