import { BaseSchema } from '../base'

export class StringSchema extends BaseSchema<string> {
  static create (): StringSchema {
    return new StringSchema({})
  }

  parse (input: unknown): string {
    if (typeof input !== 'string') {
      throw new Error('Input is not a string')
    }
    return input
  }
}
