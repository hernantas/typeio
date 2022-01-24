import { BaseSchemaDefinition } from './BaseSchemaDefinition'
import { LiteralType } from '../../alias/LiteralType'

export interface LiteralSchemaDefinition<T extends LiteralType> extends BaseSchemaDefinition {
  readonly value: T
}
