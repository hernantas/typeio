import { BaseSchemaDefinition } from '../base/BaseSchemaDefinition'
import { TypeOfMap } from '../base/TypeOfMap'
import { TupleSchemaType } from './TupleSchemaType'

export interface TupleSchemaDefinition<T extends TupleSchemaType> extends BaseSchemaDefinition<TypeOfMap<T>> {
  readonly items: T
}
