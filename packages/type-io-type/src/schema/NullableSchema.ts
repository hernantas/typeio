import { AnySchema } from './AnySchema'
import { BaseSchema } from './BaseSchema'
import { TypeOf } from './helper/TypeOf'
import { NullableDefinition } from './definition/NullableDefinition'

export class NullableSchema<T extends AnySchema> extends BaseSchema<
  TypeOf<T> | null,
  NullableDefinition<T>
> {
  static create<T extends AnySchema>(type: T): NullableSchema<T> {
    return new NullableSchema({ name: `Nullable<${type.name}>`, type })
  }

  is(input: unknown): input is TypeOf<T> | null {
    return input === null || this.definition.type.is(input)
  }
}
