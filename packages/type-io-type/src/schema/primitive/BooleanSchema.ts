import { BaseSchema } from '../base/BaseSchema'

export class BooleanSchema extends BaseSchema<boolean> {
  static create (): BooleanSchema {
    return new BooleanSchema({ name: 'boolean' })
  }

  is (input: unknown): input is boolean {
    return typeof input === 'boolean'
  }
}
