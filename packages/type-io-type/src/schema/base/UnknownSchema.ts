import { BaseSchema } from './BaseSchema'

export class UnknownSchema extends BaseSchema<unknown> {
  static create (): UnknownSchema {
    return new UnknownSchema({})
  }

  parse (input: unknown): unknown {
    return input
  }
}
