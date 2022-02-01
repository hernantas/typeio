import { BaseDefinition } from './BaseDefinition'
import { TupleSchemaType } from '../type/TupleSchemaType'

export interface TupleDefinition<T extends TupleSchemaType>
  extends BaseDefinition {
  readonly items: T
}
