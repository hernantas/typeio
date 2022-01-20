import { AnySchema } from '../base/AnySchema'
import { BaseSchemaDefinition } from '../base/BaseSchemaDefinition'

export interface NullableSchemaDefinition<T extends AnySchema> extends BaseSchemaDefinition {
  readonly type: T
}
