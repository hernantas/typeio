import { AnySchema } from '../AnySchema'
import { BaseSchemaDefinition } from '../base/BaseSchemaDefinition'

export interface OptionalSchemaDefinition<T extends AnySchema> extends BaseSchemaDefinition {
  readonly type: T
}
