import { ObjectType } from '../../alias'
import { BaseSchemaDefinition, SchemaMap } from '../base'

export interface ObjectSchemaDefinition<T extends ObjectType> extends BaseSchemaDefinition {
  readonly properties: SchemaMap<T>
}
