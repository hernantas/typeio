import { BaseSchema } from '../base'

export class NumberSchema extends BaseSchema<number> {
  static create (): NumberSchema {
    return new NumberSchema({})
  }

  is (input: unknown): input is number {
    return typeof input === 'number'
  }

  min (value: number): this {
    return this.check(v => v >= value, { kind: 'number_min' })
  }

  max (value: number): this {
    return this.check(v => v <= value, { kind: 'number_max' })
  }

  greater (value: number): this {
    return this.check(v => v > value, { kind: 'number_greater' })
  }

  less (value: number): this {
    return this.check(v => v < value, { kind: 'number_less' })
  }

  positive (): this {
    return this.check(v => v > 0, { kind: 'number_positive' })
  }

  negative (): this {
    return this.check(v => v < 0, { kind: 'number_negative' })
  }
}
