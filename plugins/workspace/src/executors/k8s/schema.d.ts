export interface K8sManifestSchema {
  appLabelName?: string
  imageName?: string
  namespace?: string
  organisation?: string
  registry?: string
  labels?: Record<string, string>
  standalone?: boolean
  apply?: boolean
}
