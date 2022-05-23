import { Schema } from './Schema'

const regexAlphanumeric = /^[a-zA-Z0-9]+$/
const regexBase64 =
  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
const regexEmail =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const regexIp =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
const regexNumeric = /^[0-9]+$/
const regexUuid =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
const regexUrl =
  // eslint-disable-next-line no-useless-escape
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

export class StringSchema extends Schema<string> {
  readonly _kind: string = 'string'

  static create(): StringSchema {
    return new StringSchema({ name: this.createName() })
  }

  static createName(): string {
    return 'String'
  }

  override is(input: unknown): input is string {
    return typeof input === 'string'
  }

  min(limit: number, message?: string): this {
    return this.check({
      name: 'STRING_LENGTH_MIN',
      args: { limit },
      validate: (v) => v.length >= limit,
      message,
    })
  }

  max(limit: number, message?: string): this {
    return this.check({
      name: 'STRING_LENGTH_MAX',
      args: { limit },
      validate: (v) => v.length <= limit,
      message,
    })
  }

  length(limit: number, message?: string): this {
    return this.check({
      name: 'STRING_LENGTH',
      args: { limit },
      validate: (v) => v.length === limit,
      message,
    })
  }

  notEmpty(message?: string): this {
    return this.check({
      name: 'STRING_NOT_EMPTY',
      validate: (v) => v.length > 0,
      message,
    })
  }

  pattern(pattern: RegExp, message?: string): this {
    return this.check({
      name: 'STRING_PATTERN',
      args: { pattern },
      validate: (v) => pattern.test(v),
      message,
    })
  }

  alphanumeric(message?: string): this {
    return this.check({
      name: 'STRING_PATTERN_ALPHANUMERIC',
      args: { pattern: regexAlphanumeric },
      validate: (v) => regexAlphanumeric.test(v),
      message,
    })
  }

  base64(message?: string): this {
    return this.check({
      name: 'STRING_PATTERN_BASE64',
      args: { pattern: regexBase64 },
      validate: (v) => regexBase64.test(v),
      message,
    })
  }

  email(message?: string): this {
    return this.check({
      name: 'STRING_PATTERN_EMAIL',
      args: { pattern: regexEmail },
      validate: (v) => regexEmail.test(v),
      message,
    })
  }

  ip(message?: string): this {
    return this.check({
      name: 'STRING_PATTERN_IP',
      args: { pattern: regexIp },
      validate: (v) => regexIp.test(v),
      message,
    })
  }

  numeric(message?: string): this {
    return this.check({
      name: 'STRING_PATTERN_NUMERIC',
      args: { pattern: regexNumeric },
      validate: (v) => regexNumeric.test(v),
      message,
    })
  }

  uuid(message?: string): this {
    return this.check({
      name: 'STRING_PATTERN_UUID',
      args: { pattern: regexUuid },
      validate: (v) => regexUuid.test(v),
      message,
    })
  }

  url(message?: string): this {
    return this.check({
      name: 'STRING_PATTERN_URL',
      args: { pattern: regexUrl },
      validate: (v) => regexUrl.test(v),
      message,
    })
  }
}
