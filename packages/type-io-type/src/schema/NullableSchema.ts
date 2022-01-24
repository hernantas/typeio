import { AnySchema } from './AnySchema'
import { BaseSchema } from './BaseSchema'
import { TypeOf } from './base/TypeOf'
import { NullableSchemaDefinition } from './definition/NullableSchemaDefinition'

export class NullableSchema<T extends AnySchema> extends BaseSchema<TypeOf<T> | null, NullableSchemaDefinition<T>> {
  static create <T extends AnySchema> (type: T): NullableSchema<T> {
    return new NullableSchema({ name: `Nullable<${type.name}>`, type })
  }

  is (input: unknown): input is TypeOf<T> | null {
    return input === null || this.definition.type.is(input)
  }
}
