import { BaseSchemaDefinition, TypeOfMap } from '../base'
import { TupleSchemaType } from './TupleSchemaType'

export interface TupleSchemaDefinition<T extends TupleSchemaType> extends BaseSchemaDefinition<TypeOfMap<T>> {
  readonly items: T
}
