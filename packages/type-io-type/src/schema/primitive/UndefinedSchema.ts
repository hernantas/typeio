import { BaseSchema } from '../base/BaseSchema'

export class UndefinedSchema extends BaseSchema<undefined> {
  static create (): UndefinedSchema {
    return new UndefinedSchema('undefined', {})
  }

  is (input: unknown): input is undefined {
    return typeof input === 'undefined'
  }
}
