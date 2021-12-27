import { AnySchema, BaseSchema, TypeOf } from '../base'
import { NullableSchemaDefinition } from './NullableSchemaDefinition'

export class NullableSchema<T extends AnySchema> extends BaseSchema<TypeOf<T> | null, NullableSchemaDefinition<T>> {
  static create <T extends AnySchema> (type: T): NullableSchema<T> {
    return new NullableSchema({ type })
  }

  parse (input: unknown): TypeOf<T> | null {
    return input !== null ? this.definition.type.parse(input) : null
  }
}
