import { SchemaAny } from './alias/SchemaAny'
import { BaseSchema } from './BaseSchema'
import { OptionalDefinition } from './definition/OptionalDefinition'
import { TypeOf } from './helper/TypeOf'
import { ValidationError } from './validation/ValidationError'

export class OptionalSchema<T extends SchemaAny> extends BaseSchema<
  TypeOf<T> | undefined,
  OptionalDefinition<T>
> {
  readonly _kind: string = 'optional'

  static create<T extends SchemaAny>(type: T): OptionalSchema<T> {
    return new OptionalSchema({ name: `Optional<${type.name}>`, type })
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
}
