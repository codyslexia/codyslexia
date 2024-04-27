// import * as http from 'http'
import * as qrcode from 'qrcode'
// import { OTPService } from './otp-service'
import { totpKeyuri, totpOptions, TOTPOptions } from './totp'

interface OTPKeyProps {
  user: string
  domain: string
}

type ChartSize = `${number}x${number}`

export class OTPKey {
  private readonly secret: string
  private props: OTPKeyProps
  private sealed = false

  public static from(secret: string) {
    return new OTPKey(secret)
  }

  public create(props: OTPKeyProps) {
    if (this.sealed) return
    this.props = Object.freeze({ ...props })
    this.sealed = true
    Object.freeze(this)
    return this
  }

  private constructor(secret: string) {
    this.secret = secret
  }

  get user() {
    return this.props.user
  }

  get domain() {
    return this.props.domain
  }

  public chart(size?: ChartSize) {
    if (!this.sealed) {
      console.info(
        '[cloud/totp]: Use `otp.create(props: OTPKeyProps)` to generate a GoogleChart QRCode URI'
      )
      return
    }

    return this.toChartURI({ size })
    // return `https://chart.googleapis.com/chart?chs=${
    //   size || '300x300'
    // }&chld=M|0&cht=qr&chl=otpauth://totp/${this.props.user}@${
    //   this.props.domain
    // }%3Fsecret%3D${this.secret}`
  }

  private toChartURI(props: { size?: ChartSize }) {
    const defaultSize = '300x300'
    const size = props.size ?? defaultSize
    return `https://chart.googleapis.com/chart?chs=${size}&chld=M|0&cht=qr&chl=otpauth://totp/${this.props.user}@${this.props.domain}%3Fsecret%3D${this.secret}`
  }

  public otpauth<T extends TOTPOptions<unknown> = TOTPOptions<unknown>>(opt: Partial<T> = {}) {
    if (!this.sealed) {
      console.info('[cloud/totp]: Use `otp.create(props: OTPKeyProps)` to generate an OTPAuth URI')
      return
    }

    return totpKeyuri(this.domain, this.user, this.secret, totpOptions(opt))
  }

  public async qrcode() {
    if (!this.sealed) {
      console.info(
        '[cloud/totp]: Use `otp.create(props: OTPKeyProps)` to generate a QRCode Data URL'
      )
      return
    }

    return await qrcode.toDataURL(this.otpauth() as string)
  }
}

// const secret = OTPService.create()
// const key = OTPKey.from(secret).create({ user: 'moka', domain: 'moka.com' })
// const server = http.createServer((req: any, res: any) => {
//   res.writeHead(301, {
//     'Cache-Control': 'no-cache', // prevent to reload old QR code when re-running
//     Location: key?.chart(),
//   })
//   res.end()
// })
// server.listen(3000)
// console.log('Open in your browser http://localhost:3000')
// console.log(key?.otpauth())
// console.log(OTPService.refresh(secret))
// ;(async function () {
//   console.log(await key?.qrcode())
// })()
