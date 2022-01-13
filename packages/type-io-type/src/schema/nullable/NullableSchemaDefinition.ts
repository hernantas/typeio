import { AnySchema } from '../base/AnySchema'
import { BaseSchemaDefinition } from '../base/BaseSchemaDefinition'
import { TypeOf } from '../base/TypeOf'

export interface NullableSchemaDefinition<T extends AnySchema> extends BaseSchemaDefinition<TypeOf<T>> {
  readonly type: T
}
