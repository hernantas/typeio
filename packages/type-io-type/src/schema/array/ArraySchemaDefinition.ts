import { AnySchema } from '../base/AnySchema'
import { BaseSchemaDefinition } from '../base/BaseSchemaDefinition'
import { TypeOf } from '../base/TypeOf'

export interface ArraySchemaDefinition<T extends AnySchema> extends BaseSchemaDefinition<Array<TypeOf<T>>> {
  /**
   * Inner type
   */
  readonly type: T
}
