import { SchemaAny } from './alias/SchemaAny'
import { BaseSchema } from './BaseSchema'
import { NullableDefinition } from './definition/NullableDefinition'
import { TypeOf } from './helper/TypeOf'

export class NullableSchema<T extends SchemaAny> extends BaseSchema<
  TypeOf<T> | null,
  NullableDefinition<T>
> {
  static create<T extends SchemaAny>(type: T): NullableSchema<T> {
    return new NullableSchema({ name: `Nullable<${type.name}>`, type })
  }

  is(input: unknown): input is TypeOf<T> | null {
    return input === null || this.definition.type.is(input)
  }
}
