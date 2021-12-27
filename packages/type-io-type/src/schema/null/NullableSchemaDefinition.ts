import { AnySchema, BaseSchemaDefinition } from '../base'

export interface NullableSchemaDefinition<T extends AnySchema> extends BaseSchemaDefinition {
  readonly type: T
}
