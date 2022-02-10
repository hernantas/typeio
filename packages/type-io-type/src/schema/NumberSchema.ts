import { BaseSchema } from './BaseSchema'

export class NumberSchema extends BaseSchema<number> {
  readonly _kind: string = 'number'

  static create(): NumberSchema {
    return new NumberSchema({ name: 'Number' })
  }

  is(input: unknown): input is number {
    return typeof input === 'number'
  }

  min(value: number): this {
    return this.check((v) => v >= value, { kind: 'NUMBER_MIN' })
  }

  max(value: number): this {
    return this.check((v) => v <= value, { kind: 'NUMBER_MAX' })
  }

  greater(value: number): this {
    return this.check((v) => v > value, { kind: 'NUMBER_GREATER' })
  }

  less(value: number): this {
    return this.check((v) => v < value, { kind: 'NUMBER_LESS' })
  }

  positive(): this {
    return this.check((v) => v > 0, { kind: 'NUMBER_POSITIVE' })
  }

  negative(): this {
    return this.check((v) => v < 0, { kind: 'NUMBER_NEGATIVE' })
  }
}