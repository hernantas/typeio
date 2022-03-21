import { BaseSchema } from './BaseSchema'

export class DateSchema extends BaseSchema<Date> {
  readonly _kind: string = 'date'

  static create(): DateSchema {
    return new DateSchema({ name: this.createName() })
  }

  static createName(): string {
    return 'Date'
  }

  override is(input: unknown): input is Date {
    return input instanceof Date
  }

  min(date: Date, message?: string): this {
    return this.check({
      name: 'DATE_MIN',
      args: { date },
      validate: (v) => v >= date,
      message,
    })
  }

  max(date: Date, message?: string): this {
    return this.check({
      name: 'DATE_MAX',
      args: { date },
      validate: (v) => v <= date,
      message,
    })
  }

  greater(date: Date, message?: string): this {
    return this.check({
      name: 'DATE_GREATER',
      args: { date },
      validate: (v) => v > date,
      message,
    })
  }

  less(date: Date, message?: string): this {
    return this.check({
      name: 'DATE_LESS',
      args: { date },
      validate: (v) => v < date,
      message,
    })
  }
}
