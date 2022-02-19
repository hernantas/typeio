import { BaseSchema } from './BaseSchema'

export class NumberSchema extends BaseSchema<number> {
  readonly _kind: string = 'number'

  static create(): NumberSchema {
    return new NumberSchema({ name: 'Number' })
  }

  is(input: unknown): input is number {
    return typeof input === 'number'
  }

  min(limit: number): this {
    return this.check({
      name: 'NUMBER_MIN',
      args: { limit },
      validate: (v) => v >= limit,
    })
  }

  max(limit: number): this {
    return this.check({
      name: 'NUMBER_MAX',
      args: { limit },
      validate: (v) => v <= limit,
    })
  }

  greater(limit: number): this {
    return this.check({
      name: 'NUMBER_GREATER',
      args: { limit },
      validate: (v) => v > limit,
    })
  }

  less(limit: number): this {
    return this.check({
      name: 'NUMBER_LESS',
      args: { limit },
      validate: (v) => v < limit,
    })
  }

  positive(): this {
    return this.check({ name: 'NUMBER_POSITIVE', validate: (v) => v > 0 })
  }

  negative(): this {
    return this.check({ name: 'NUMBER_NEGATIVE', validate: (v) => v < 0 })
  }
}
