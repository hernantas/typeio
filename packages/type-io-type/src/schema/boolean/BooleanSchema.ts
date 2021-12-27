import { BaseSchema } from '../base'

export class BooleanSchema extends BaseSchema<boolean> {
  static create (): BooleanSchema {
    return new BooleanSchema({})
  }

  parse (input: unknown): boolean {
    if (typeof input !== 'boolean') {
      throw new Error('Input is not a boolean')
    }
    return input
  }
}
