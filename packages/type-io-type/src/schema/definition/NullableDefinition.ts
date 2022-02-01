import { AnySchema } from '../AnySchema'
import { BaseDefinition } from './BaseDefinition'

export interface NullableDefinition<T extends AnySchema>
  extends BaseDefinition {
  readonly type: T
}
