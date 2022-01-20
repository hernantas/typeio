import { AnySchema } from '../base/AnySchema'
import { BaseSchemaDefinition } from '../base/BaseSchemaDefinition'

export interface OptionalSchemaDefinition<T extends AnySchema> extends BaseSchemaDefinition {
  readonly type: T
}
