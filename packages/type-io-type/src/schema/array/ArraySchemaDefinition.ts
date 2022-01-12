import { AnySchema, BaseSchemaDefinition, TypeOf } from '../base'

export interface ArraySchemaDefinition<T extends AnySchema> extends BaseSchemaDefinition<Array<TypeOf<T>>> {
  /**
   * Inner type
   */
  readonly type: T
}
