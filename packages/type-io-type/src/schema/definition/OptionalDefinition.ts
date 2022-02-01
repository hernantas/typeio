import { AnySchema } from '../AnySchema'
import { BaseDefinition } from './BaseDefinition'

export interface OptionalDefinition<T extends AnySchema>
  extends BaseDefinition {
  readonly type: T
}
