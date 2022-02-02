import { TupleType } from '../../alias/TupleType'
import { AnySchema } from '../AnySchema'
import { BaseDefinition } from './BaseDefinition'

export interface IntersectDefinition<T extends TupleType<AnySchema>>
  extends BaseDefinition {
  readonly items: T
}
