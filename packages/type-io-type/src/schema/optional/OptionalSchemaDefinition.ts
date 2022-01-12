import { AnySchema, BaseSchemaDefinition, TypeOf } from '../base'

export interface OptionalSchemaDefinition<T extends AnySchema> extends BaseSchemaDefinition<TypeOf<T>> {
  readonly type: T
}
