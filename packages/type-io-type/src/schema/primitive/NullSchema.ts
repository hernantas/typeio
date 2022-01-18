import { BaseSchema } from '../base/BaseSchema'

export class NullSchema extends BaseSchema<null> {
  static create (): NullSchema {
    return new NullSchema('null', {})
  }

  is (input: unknown): input is null {
    return input === null
  }
}
