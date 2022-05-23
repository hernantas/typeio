import { SchemaAny } from './alias/SchemaAny'
import { ArraySchema } from './ArraySchema'
import { BaseSchema } from './BaseSchema'
import { NullableDefinition } from './definition/NullableDefinition'
import { TypeOf } from './helper/TypeOf'
import { OptionalSchema } from './OptionalSchema'
import { ValidationError } from './validation/ValidationError'

export class NullableSchema<T extends SchemaAny> extends BaseSchema<
  TypeOf<T> | null,
  NullableDefinition<T>
> {
  readonly _kind: string = 'nullable'

  static create<T extends SchemaAny>(type: T): NullableSchema<T> {
    return new NullableSchema({ name: this.createName(type.name), type })
  }

  static createName(name: string): string {
    return `Nullable<${name}>`
  }

  static isInstance(input: SchemaAny): input is NullableSchema<SchemaAny> {
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

  array(): ArraySchema<this> {
    return ArraySchema.create(this)
  }

  optional(): OptionalSchema<this> {
    return OptionalSchema.create(this)
  }
}
