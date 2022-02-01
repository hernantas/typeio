import { BaseDefinition } from './BaseDefinition'
import { TupleSchemaType } from '../type/TupleSchemaType'

export interface IntersectDefinition<T extends TupleSchemaType>
  extends BaseDefinition {
  readonly items: T
}
