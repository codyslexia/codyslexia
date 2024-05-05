export * as Query from './project-queries'
export * as Mutation from './project-mutations'

export const Project = {
  __resolveReference(project, { fetchProjectById }) {
    return fetchProjectById(project.id)
  },
}
