import mongoose from 'mongoose'

export interface ProjectAttrs {
  name?: string
  kind: string
  userId: string
  environment?: string
  description?: string
}

export interface ProjectModel extends mongoose.Model<ProjectDoc> {
  build(attrs: ProjectAttrs): any
}

export interface ProjectDoc extends mongoose.Document {
  name: string
  kind: string
  userId: string
  environment: string
  description: string
  createdAt: string
  updatedAt: string
}

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      default: '',
    },
    kind: {
      type: String,
      required: true,
      // TODO: @moatorres - Use a shared constant for the options
      options: ['web', 'mobile', 'api'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    environment: {
      type: String,
      default: 'development',
      // TODO: @moatorres - Use a shared constant for the options
      options: ['development', 'staging', 'production'],
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
  },
  {
    collection: 'projects',
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
      },
    },
  }
)

projectSchema.pre('save', async function (done) {
  done()
})

projectSchema.statics.build = (attrs: ProjectAttrs) => {
  return new ProjectModel(attrs)
}

export const ProjectModel = mongoose.model<ProjectDoc, ProjectModel>('Project', projectSchema)
