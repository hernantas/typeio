import { UnionType } from '../../alias/UnionType'
import { AnySchema } from '../AnySchema'
import { BaseDefinition } from './BaseDefinition'

export interface UnionDefinition<T extends UnionType<AnySchema>>
  extends BaseDefinition {
  readonly items: T
}
