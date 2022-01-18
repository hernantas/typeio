import { LiteralType } from '../../alias/LiteralType'
import { BaseSchema } from '../base/BaseSchema'
import { LiteralSchemaDefinition } from './LiteralSchemaDefinition'

export class LiteralSchema<T extends LiteralType> extends BaseSchema<T, LiteralSchemaDefinition<T>> {
  static create <T extends LiteralType> (value: T): LiteralSchema<T> {
    return new LiteralSchema(value.toString(), { value })
  }

  is (input: unknown): input is T {
    return input === this.definition.value
  }
}
