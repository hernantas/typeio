import { BaseSchema } from '../base'

export class UndefinedSchema extends BaseSchema<undefined> {
  static create (): UndefinedSchema {
    return new UndefinedSchema({})
  }

  is (input: unknown): input is undefined {
    return typeof input === 'undefined'
  }
}
