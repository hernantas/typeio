import { LiteralType } from '../alias/LiteralType'
import { BaseSchema } from './BaseSchema'
import { LiteralSchemaDefinition } from './definition/LiteralSchemaDefinition'

export class LiteralSchema<T extends LiteralType> extends BaseSchema<
  T,
  LiteralSchemaDefinition<T>
> {
  static create<T extends LiteralType>(value: T): LiteralSchema<T> {
    return new LiteralSchema({ name: value.toString(), value })
  }

  is(input: unknown): input is T {
    return input === this.definition.value
  }
}
