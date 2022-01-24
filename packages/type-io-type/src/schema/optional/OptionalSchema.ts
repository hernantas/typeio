import { AnySchema } from '../base/AnySchema'
import { BaseSchema } from '../base/BaseSchema'
import { TypeOf } from '../base/TypeOf'
import { OptionalSchemaDefinition } from './OptionalSchemaDefinition'

export class OptionalSchema<T extends AnySchema> extends BaseSchema<TypeOf<T> | undefined, OptionalSchemaDefinition<T>> {
  static create <T extends AnySchema> (type: T): OptionalSchema<T> {
    return new OptionalSchema({ name: `Optional<${type.name}>`, type })
  }

  is (input: unknown): input is TypeOf<T> | undefined {
    return input === undefined || this.definition.type.is(input)
  }
}
