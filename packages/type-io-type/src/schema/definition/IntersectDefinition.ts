import { IntersectType } from '../../alias/IntersectType'
import { AnySchema } from '../AnySchema'
import { BaseDefinition } from './BaseDefinition'

export interface IntersectDefinition<T extends IntersectType<AnySchema>>
  extends BaseDefinition {
  readonly items: T
}
