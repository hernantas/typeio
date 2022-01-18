import { AnySchema } from '../base/AnySchema'
import { BaseSchema } from '../base/BaseSchema'
import { TypeOf } from '../base/TypeOf'
import { OptionalSchemaDefinition } from './OptionalSchemaDefinition'

export class OptionalSchema<T extends AnySchema> extends BaseSchema<TypeOf<T> | undefined, OptionalSchemaDefinition<T>> {
  static create <T extends AnySchema> (type: T): OptionalSchema<T> {
    return new OptionalSchema(`Optional<${type.name}>`, { type })
  }

  is (input: unknown): input is TypeOf<T> | undefined {
    return this.definition.type.is(input) || input === undefined
  }
}
