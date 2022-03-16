import { BaseSchema } from './BaseSchema'

export class NumberSchema extends BaseSchema<number> {
  readonly _kind: string = 'number'

  static create(): NumberSchema {
    return new NumberSchema({ name: this.createName() })
  }

  static createName(): string {
    return 'Number'
  }

  override is(input: unknown): input is number {
    return typeof input === 'number'
  }

  min(limit: number, message?: string): this {
    return this.check({
      name: 'NUMBER_MIN',
      args: { limit },
      validate: (v) => v >= limit,
      message,
    })
  }

  max(limit: number, message?: string): this {
    return this.check({
      name: 'NUMBER_MAX',
      args: { limit },
      validate: (v) => v <= limit,
      message,
    })
  }

  greater(limit: number, message?: string): this {
    return this.check({
      name: 'NUMBER_GREATER',
      args: { limit },
      validate: (v) => v > limit,
      message,
    })
  }

  less(limit: number, message?: string): this {
    return this.check({
      name: 'NUMBER_LESS',
      args: { limit },
      validate: (v) => v < limit,
      message,
    })
  }

  positive(message?: string): this {
    return this.check({
      name: 'NUMBER_POSITIVE',
      validate: (v) => v > 0,
      message,
    })
  }

  negative(message?: string): this {
    return this.check({
      name: 'NUMBER_NEGATIVE',
      validate: (v) => v < 0,
      message,
    })
  }
}
