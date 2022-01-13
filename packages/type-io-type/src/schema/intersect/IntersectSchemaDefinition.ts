import { BaseSchemaDefinition } from '../base/BaseSchemaDefinition'
import { TypeOfMap } from '../base/TypeOfMap'
import { TupleSchemaType } from '../tuple/TupleSchemaType'
import { IntersectMap } from './IntersectMap'

export interface IntersectSchemaDefinition<T extends TupleSchemaType>
  extends BaseSchemaDefinition<IntersectMap<TypeOfMap<T>>> {
  readonly items: T
}
