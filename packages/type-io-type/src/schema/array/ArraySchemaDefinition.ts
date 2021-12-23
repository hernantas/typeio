import { AnySchema, BaseSchemaDefinition } from '../base'

export interface ArraySchemaDefinition<T extends AnySchema> extends BaseSchemaDefinition {
  /**
   * Inner type
   */
  type: T
}
