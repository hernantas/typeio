import { BaseSchema } from '../base'

export class StringSchema extends BaseSchema<string> {
  static create (): StringSchema {
    return new StringSchema({})
  }

  is (input: unknown): input is string {
    return typeof input === 'string'
  }
}
