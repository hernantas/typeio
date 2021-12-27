import { AnySchema, BaseSchema, TypeOf } from '../base'
import { OptionalSchemaDefinition } from './OptionalSchemaDefinition'

export class OptionalSchema<T extends AnySchema> extends BaseSchema<TypeOf<T> | undefined, OptionalSchemaDefinition<T>> {
  static create <T extends AnySchema> (type: T): OptionalSchema<T> {
    return new OptionalSchema({ type })
  }

  parse (input: unknown): TypeOf<T> | undefined {
    return input !== undefined ? this.definition.type.parse(input) : undefined
  }
}
