import { BaseSchema } from '../base/BaseSchema'

export class NumberSchema extends BaseSchema<number> {
  static create (): NumberSchema {
    return new NumberSchema({})
  }

  is (input: unknown): input is number {
    return typeof input === 'number'
  }

  min (value: number): this {
    return this.addRule(v => v >= value, { kind: 'NUMBER_MIN' })
  }

  max (value: number): this {
    return this.addRule(v => v <= value, { kind: 'NUMBER_MAX' })
  }

  greater (value: number): this {
    return this.addRule(v => v > value, { kind: 'NUMBER_GREATER' })
  }

  less (value: number): this {
    return this.addRule(v => v < value, { kind: 'NUMBER_LESS' })
  }

  positive (): this {
    return this.addRule(v => v > 0, { kind: 'NUMBER_POSITIVE' })
  }

  negative (): this {
    return this.addRule(v => v < 0, { kind: 'NUMBER_NEGATIVE' })
  }
}