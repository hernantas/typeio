import { AnySchema } from '../AnySchema'
import { BaseDefinition } from './BaseDefinition'

export interface ArrayDefinition<T extends AnySchema> extends BaseDefinition {
  /**
   * Inner type
   */
  readonly type: T
}
