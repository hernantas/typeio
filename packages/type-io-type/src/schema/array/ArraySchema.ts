import { AnySchema, BaseSchema, TypeOf } from '../base'
import { ArraySchemaDefinition } from './ArraySchemaDefinition'

export class ArraySchema<T extends AnySchema> extends BaseSchema<Array<TypeOf<T>>, ArraySchemaDefinition<T>> {
  static create <T extends AnySchema> (type: T): ArraySchema<T> {
    return new ArraySchema({ type })
  }

  get type (): T {
    return this.definition.type
  }

  is (input: unknown): input is Array<TypeOf<T>> {
    return Array.isArray(input) && input.map(v => this.definition.type.is(v)).length === input.length
  }
}
