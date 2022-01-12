import { AnySchema, BaseSchemaDefinition, TypeOf } from '../base'

export interface NullableSchemaDefinition<T extends AnySchema> extends BaseSchemaDefinition<TypeOf<T>> {
  readonly type: T
}
