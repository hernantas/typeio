import { SchemaAny } from './alias/SchemaAny'
import { BaseSchema } from './BaseSchema'
import { NullableDefinition } from './definition/NullableDefinition'
import { TypeOf } from './helper/TypeOf'
import { ValidationError } from './validation/ValidationError'

export class NullableSchema<T extends SchemaAny> extends BaseSchema<
  TypeOf<T> | null,
  NullableDefinition<T>
> {
  readonly _kind: string = 'nullable'

  static create<T extends SchemaAny>(type: T): NullableSchema<T> {
    return new NullableSchema({ name: `Nullable<${type.name}>`, type })
  }

  static is(input: SchemaAny): input is NullableSchema<SchemaAny> {
    return input._kind === 'nullable'
  }

  get type(): T {
    return this.definition.type
  }

  override is(input: unknown): input is TypeOf<T> | null {
    return input === null || this.type.is(input)
  }

  override validate(input: TypeOf<T> | null): ValidationError[] {
    return super
      .validate(input)
      .concat(this.type.is(input) ? this.type.validate(input) : [])
  }
}
