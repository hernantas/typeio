import { DateSchema } from '../schema/DateSchema'
import { DecodeError } from './error/DecodeError'
import { Codec } from './Codec'

export class DateCodec implements Codec<DateSchema, string> {
  readonly name: string = DateSchema.createName()

  decode(value: unknown): Date {
    if (value instanceof Date) {
      return value
    }

    if (typeof value === 'string') {
      return new Date(value)
    }

    throw new DecodeError(this.name)
  }

  encode(value: Date): string {
    return value.toISOString()
  }
}
