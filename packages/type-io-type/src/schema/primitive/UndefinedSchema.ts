import { BaseSchema } from '../BaseSchema'

export class UndefinedSchema extends BaseSchema<undefined> {
  static create (): UndefinedSchema {
    return new UndefinedSchema({ name: 'undefined' })
  }

  is (input: unknown): input is undefined {
    return typeof input === 'undefined'
  }
}
