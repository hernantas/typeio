import { SchemaAny } from './alias/SchemaAny'
import { BaseSchema } from './BaseSchema'
import { OptionalDefinition } from './definition/OptionalDefinition'
import { TypeOf } from './helper/TypeOf'

export class OptionalSchema<T extends SchemaAny> extends BaseSchema<
  TypeOf<T> | undefined,
  OptionalDefinition<T>
> {
  static create<T extends SchemaAny>(type: T): OptionalSchema<T> {
    return new OptionalSchema({ name: `Optional<${type.name}>`, type })
  }

  is(input: unknown): input is TypeOf<T> | undefined {
    return input === undefined || this.definition.type.is(input)
  }
}
