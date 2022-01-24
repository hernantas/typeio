import { BaseSchema } from '../base/BaseSchema'

export class NullSchema extends BaseSchema<null> {
  static create (): NullSchema {
    return new NullSchema({ name: 'null' })
  }

  is (input: unknown): input is null {
    return input === null
  }
}
