import { AnySchema, BaseSchemaDefinition } from '../base'

export interface OptionalSchemaDefinition<T extends AnySchema> extends BaseSchemaDefinition {
  readonly type: T
}
