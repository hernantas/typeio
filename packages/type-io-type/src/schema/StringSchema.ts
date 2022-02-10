import { BaseSchema } from './BaseSchema'

export class StringSchema extends BaseSchema<string> {
  readonly _kind: string = 'string'

  static create(): StringSchema {
    return new StringSchema({ name: 'String' })
  }

  is(input: unknown): input is string {
    return typeof input === 'string'
  }

  min(value: number): this {
    return this.check((v) => v.length >= value, { kind: 'STRING_MIN' })
  }

  max(value: number): this {
    return this.check((v) => v.length <= value, { kind: 'STRING_MAX' })
  }

  length(value: number): this {
    return this.check((v) => v.length === value, { kind: 'STRING_LENGTH' })
  }

  pattern(pattern: RegExp): this {
    return this.check((v) => pattern.test(v), { kind: 'STRING_PATTERN' })
  }

  alphanumeric(): this {
    return this.pattern(/^[a-zA-Z0-9]+$/)
  }
}
