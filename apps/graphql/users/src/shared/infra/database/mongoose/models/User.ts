import mongoose from 'mongoose'

import { toHash } from '../../../../utils/password-hasher'

export interface UserAttrs {
  email: string
  password: string
}

export interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserModel
}

export interface UserDoc extends mongoose.Document {
  email: string
  password: string
  createdAt: string
  updatedAt: string
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'users',
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

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await toHash(this.get('password'))
    this.set('password', hashed)
  }
  done()
})

userSchema.statics.build = (attrs: UserAttrs) => {
  return new UserModel(attrs)
}

export const UserModel = mongoose.model<UserDoc, UserModel>('User', userSchema)
