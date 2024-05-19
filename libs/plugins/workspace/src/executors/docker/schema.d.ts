export interface DockerBuildExecutorSchema {
  baseDockerImage?: string
  imageName?: string
  kind?: 'react' | 'nextjs' | 'nodejs' | 'graphql'
  registry?: string
  organisation?: string
  outputPath?: string
  standalone?: boolean
}
