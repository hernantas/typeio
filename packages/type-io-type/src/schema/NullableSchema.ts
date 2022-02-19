import { SchemaAny } from './alias/SchemaAny'
import { BaseSchema } from './BaseSchema'
import { NullableDefinition } from './definition/NullableDefinition'
import { TypeOf } from './helper/TypeOf'

export class NullableSchema<T extends SchemaAny> extends BaseSchema<
  TypeOf<T> | null,
  NullableDefinition<T>
> {
  readonly _kind: string = 'nullable'

  static create<T extends SchemaAny>(type: T): NullableSchema<T> {
    return new NullableSchema({ name: `Nullable<${type.name}>`, type })
  }

  get type(): T {
    return this.definition.type
  }

  override is(input: unknown): input is TypeOf<T> | null {
    return input === null || this.definition.type.is(input)
  }
}
