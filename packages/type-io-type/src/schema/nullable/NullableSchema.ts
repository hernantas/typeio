import { AnySchema } from '../base/AnySchema'
import { BaseSchema } from '../base/BaseSchema'
import { TypeOf } from '../base/TypeOf'
import { NullableSchemaDefinition } from './NullableSchemaDefinition'

export class NullableSchema<T extends AnySchema> extends BaseSchema<TypeOf<T> | null, NullableSchemaDefinition<T>> {
  static create <T extends AnySchema> (type: T): NullableSchema<T> {
    return new NullableSchema(`Nullable<${type.name}>`, { type })
  }

  is (input: unknown): input is TypeOf<T> | null {
    return input === null || this.definition.type.is(input)
  }
}
