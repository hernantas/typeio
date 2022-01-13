import { BaseSchemaDefinition } from '../base/BaseSchemaDefinition'
import { LiteralType } from '../../alias/LiteralType'

export interface LiteralSchemaDefinition<T extends LiteralType> extends BaseSchemaDefinition<T> {
  readonly value: T
}
