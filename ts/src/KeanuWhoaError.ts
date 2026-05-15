
import { Context } from './Context'


class KeanuWhoaError extends Error {

  isKeanuWhoaError = true

  sdk = 'KeanuWhoa'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  KeanuWhoaError
}

