import { TupleSchemaType } from '../alias/TupleSchemaType'
import { BaseDefinition } from './BaseDefinition'

export interface TupleDefinition<T extends TupleSchemaType>
  extends BaseDefinition {
  readonly items: T
}
