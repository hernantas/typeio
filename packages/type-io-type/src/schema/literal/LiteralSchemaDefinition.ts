import { LiteralType } from '../../alias'
import { BaseSchemaDefinition } from '../base'

export interface LiteralSchemaDefinition<T extends LiteralType> extends BaseSchemaDefinition<T> {
  readonly value: T
}
