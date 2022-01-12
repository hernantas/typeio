import { BaseSchemaDefinition, TypeOfMap } from '../base'
import { TupleSchemaType } from '../tuple'
import { IntersectMap } from './IntersectMap'

export interface IntersectSchemaDefinition<T extends TupleSchemaType>
  extends BaseSchemaDefinition<IntersectMap<TypeOfMap<T>>> {
  readonly items: T
}
