import { BaseSchema } from '../base'

export class NumberSchema extends BaseSchema<number> {
  static create (): NumberSchema {
    return new NumberSchema({})
  }

  is (input: unknown): input is number {
    return typeof input === 'number'
  }
}
