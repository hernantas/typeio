import { TupleType } from '../../alias/TupleType'
import { SchemaAny } from '../alias/SchemaAny'
import { BaseDefinition } from './BaseDefinition'

export interface TupleDefinition<T extends TupleType<SchemaAny>>
  extends BaseDefinition {
  readonly items: T
}
