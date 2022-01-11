import { AnySchema, BaseSchema, TypeOf } from '../base'
import { NullableSchemaDefinition } from './NullableSchemaDefinition'

export class NullableSchema<T extends AnySchema> extends BaseSchema<TypeOf<T> | null, NullableSchemaDefinition<T>> {
  static create <T extends AnySchema> (type: T): NullableSchema<T> {
    return new NullableSchema({ type })
  }

  is (input: unknown): input is TypeOf<T> | null {
    return this.definition.type.is(input) || input === null
  }
}
