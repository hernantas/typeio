import { TupleSchemaType } from '../alias/TupleSchemaType'
import { Definition } from './Definition'

export interface TupleDefinition<T extends TupleSchemaType> extends Definition {
  readonly items: T
}
