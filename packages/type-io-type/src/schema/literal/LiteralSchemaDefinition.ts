import { LiteralType } from '../../alias'
import { BaseSchemaDefinition } from '../base'

export interface LiteralSchemaDefinition<T extends LiteralType> extends BaseSchemaDefinition {
  readonly value: T
}
