import { AnySchema } from '../AnySchema'
import { BaseSchemaDefinition } from '../base/BaseSchemaDefinition'

export interface ArraySchemaDefinition<T extends AnySchema> extends BaseSchemaDefinition {
  /**
   * Inner type
   */
  readonly type: T
}
