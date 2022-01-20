import { BaseSchemaDefinition } from '../base/BaseSchemaDefinition'
import { TupleSchemaType } from './TupleSchemaType'

export interface TupleSchemaDefinition<T extends TupleSchemaType> extends BaseSchemaDefinition {
  readonly items: T
}
