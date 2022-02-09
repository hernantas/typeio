import { ObjectType } from '../../alias/ObjectType'
import { SchemaAny } from '../alias/SchemaAny'
import { BaseDefinition } from './BaseDefinition'

export interface ObjectDefinition<T extends ObjectType<SchemaAny>>
  extends BaseDefinition {
  readonly properties: T
}
