import { AnySchema } from './AnySchema'
import { BaseSchema } from './BaseSchema'
import { TypeOf } from './helper/TypeOf'
import { OptionalDefinition } from './definition/OptionalDefinition'

export class OptionalSchema<T extends AnySchema> extends BaseSchema<
  TypeOf<T> | undefined,
  OptionalDefinition<T>
> {
  static create<T extends AnySchema>(type: T): OptionalSchema<T> {
    return new OptionalSchema({ name: `Optional<${type.name}>`, type })
  }

  is(input: unknown): input is TypeOf<T> | undefined {
    return input === undefined || this.definition.type.is(input)
  }
}
