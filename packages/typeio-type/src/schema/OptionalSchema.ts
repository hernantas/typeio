import { SchemaAny } from './alias/SchemaAny'
import { ArraySchema } from './ArraySchema'
import { BaseSchema } from './BaseSchema'
import { OptionalDefinition } from './definition/OptionalDefinition'
import { TypeOf } from './helper/TypeOf'
import { NullableSchema } from './NullableSchema'
import { ValidationError } from './validation/ValidationError'

export class OptionalSchema<T extends SchemaAny> extends BaseSchema<
  TypeOf<T> | undefined,
  OptionalDefinition<T>
> {
  readonly _kind: string = 'optional'

  static create<T extends SchemaAny>(type: T): OptionalSchema<T> {
    return new OptionalSchema({ name: this.createName(type.name), type })
  }

  static createName(name: string): string {
    return `Optional<${name}>`
  }

  static isInstance(input: SchemaAny): input is OptionalSchema<SchemaAny> {
    return input._kind === 'optional'
  }

  get type(): T {
    return this.definition.type
  }

  override is(input: unknown): input is TypeOf<T> | undefined {
    return input === undefined || this.type.is(input)
  }

  override validate(input: TypeOf<T> | undefined): ValidationError[] {
    return super
      .validate(input)
      .concat(this.type.is(input) ? this.type.validate(input) : [])
  }

  array(): ArraySchema<this> {
    return ArraySchema.create(this)
  }

  nullable(): NullableSchema<this> {
    return NullableSchema.create(this)
  }
}
