import { BaseSchema } from '../base'

export class UndefinedSchema extends BaseSchema<undefined> {
  static create (): UndefinedSchema {
    return new UndefinedSchema({})
  }

  parse (input: unknown): undefined {
    if (input !== undefined) {
      throw new Error('Cannot parse input that\'s not undefined')
    }
    return undefined
  }
}
