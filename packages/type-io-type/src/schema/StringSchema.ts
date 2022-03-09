import { BaseSchema } from './BaseSchema'

const regexAlphanumeric = /^[a-zA-Z0-9]+$/
const regexEmail =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const regexUuid =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
const regexUrl =
  // eslint-disable-next-line no-useless-escape
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

export class StringSchema extends BaseSchema<string> {
  readonly _kind: string = 'string'

  static create(): StringSchema {
    return new StringSchema({ name: 'String' })
  }

  override is(input: unknown): input is string {
    return typeof input === 'string'
  }

  min(limit: number): this {
    return this.check({
      name: 'STRING_LENGTH_MIN',
      args: { limit },
      validate: (v) => v.length >= limit,
    })
  }

  max(limit: number): this {
    return this.check({
      name: 'STRING_LENGTH_MAX',
      args: { limit },
      validate: (v) => v.length <= limit,
    })
  }

  length(limit: number): this {
    return this.check({
      name: 'STRING_LENGTH',
      args: { limit },
      validate: (v) => v.length === limit,
    })
  }

  notEmpty(): this {
    return this.check({
      name: 'STRING_NOT_EMPTY',
      validate: (v) => v.length > 0,
    })
  }

  pattern(pattern: RegExp): this {
    return this.check({
      name: 'STRING_PATTERN',
      args: { pattern },
      validate: (v) => pattern.test(v),
    })
  }

  alphanumeric(): this {
    return this.check({
      name: 'STRING_PATTERN_ALPHANUMERIC',
      args: { pattern: regexAlphanumeric },
      validate: (v) => regexAlphanumeric.test(v),
    })
  }

  email(): this {
    return this.check({
      name: 'STRING_PATTERN_EMAIL',
      args: { pattern: regexEmail },
      validate: (v) => regexEmail.test(v),
    })
  }

  uuid(): this {
    return this.check({
      name: 'STRING_PATTERN_UUID',
      args: { pattern: regexUuid },
      validate: (v) => regexUuid.test(v),
    })
  }

  url(): this {
    return this.check({
      name: 'STRING_PATTERN_URL',
      args: { pattern: regexUrl },
      validate: (v) => regexUrl.test(v),
    })
  }
}
