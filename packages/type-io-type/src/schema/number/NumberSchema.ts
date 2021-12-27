import { BaseSchema } from '../base'

export class NumberSchema extends BaseSchema<number> {
  static create (): NumberSchema {
    return new NumberSchema({})
  }

  parse (input: unknown): number {
    if (typeof input !== 'number') {
      throw new Error('Input is not a number')
    }
    return input
  }
}
