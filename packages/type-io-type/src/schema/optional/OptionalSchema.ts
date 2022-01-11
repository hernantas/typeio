import { AnySchema, BaseSchema, TypeOf } from '../base'
import { OptionalSchemaDefinition } from './OptionalSchemaDefinition'

export class OptionalSchema<T extends AnySchema> extends BaseSchema<TypeOf<T> | undefined, OptionalSchemaDefinition<T>> {
  static create <T extends AnySchema> (type: T): OptionalSchema<T> {
    return new OptionalSchema({ type })
  }

  is (input: unknown): input is TypeOf<T> | undefined {
    return this.definition.type.is(input) || input === undefined
  }
}
