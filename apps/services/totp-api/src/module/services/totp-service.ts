import * as qrcode from 'qrcode'
import { createUUID } from '@shared/utils'
import { createBackupTokens } from '@backend/auth'
import { authenticator, UserRepo } from './authenticator'

interface TOTPServerOptions {
  issuer?: string
  accountName?: string
}

export class TOTPService {
  private issuer: string
  private accountName: string

  constructor(issuer = 'Default', accountName = 'default@example.com') {
    this.issuer = issuer
    this.accountName = accountName
  }

  public async generate(options?: TOTPServerOptions) {
    const id = createUUID()
    const secret = authenticator.generateSecret()
    const otpauth = authenticator.keyuri(
      options?.accountName ?? this.accountName,
      options?.issuer ?? this.issuer,
      secret
    )
    const image = await qrcode.toDataURL(otpauth)
    const backup = createBackupTokens(8)
    const user = UserRepo.add({ id, secret, otpauth, backup, image })
    return user
  }

  public async check(id?: string, token?: string) {
    const { secret } = UserRepo.findById(id)
    const checked = authenticator.check(token, secret)
    const remaining = checked ? authenticator.timeRemaining() : 0
    return { id, checked, token, remaining }
  }

  public async verify(id?: string, token?: string) {
    const { secret } = UserRepo.findById(id)
    const verified = authenticator.verify({ token, secret })
    const remaining = authenticator.timeRemaining()
    return { id, verified, token, remaining }
  }

  public async refresh(id?: string) {
    const { secret } = UserRepo.findById(id)
    const token = authenticator.generate(secret)
    const remaining = authenticator.timeRemaining()
    return { id, token, remaining }
  }

  public async recover(id?: string, token?: string) {
    const user = UserRepo.findById(id)
    const success = user.backup.some((code) => code === token)
    if (success) {
      user.backup = user.backup.filter((code) => code !== token)
    }
    UserRepo.add(user)
    return { id, success }
  }
}
