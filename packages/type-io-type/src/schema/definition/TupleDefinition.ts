import { TupleType } from '../../alias/TupleType'
import { AnySchema } from '../AnySchema'
import { BaseDefinition } from './BaseDefinition'

export interface TupleDefinition<T extends TupleType<AnySchema>>
  extends BaseDefinition {
  readonly items: T
}
