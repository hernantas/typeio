import { LiteralType } from '../../alias'
import { BaseSchema } from '../base'
import { LiteralSchemaDefinition } from './LiteralSchemaDefinition'

export class LiteralSchema<T extends LiteralType> extends BaseSchema<T, LiteralSchemaDefinition<T>> {
  static create <T extends LiteralType> (value: T): LiteralSchema<T> {
    return new LiteralSchema({ value })
  }
}
