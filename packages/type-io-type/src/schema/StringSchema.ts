import { BaseSchema } from './BaseSchema'

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
    return this.pattern(/^[a-zA-Z0-9]+$/)
  }
}
