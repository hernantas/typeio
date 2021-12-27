import { BaseSchema } from '../base'

export class NullSchema extends BaseSchema<null> {
  static create (): NullSchema {
    return new NullSchema({})
  }

  parse (input: unknown): null {
    if (input !== null) {
      throw new Error('Cannot parse value that\'s not null')
    }
    return null
  }
}
