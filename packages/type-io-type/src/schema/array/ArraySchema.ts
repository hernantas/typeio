import { AnySchema, BaseSchema, TypeOf } from '../base'
import { ArraySchemaDefinition } from './ArraySchemaDefinition'

export class ArraySchema<T extends AnySchema> extends BaseSchema<Array<TypeOf<T>>, ArraySchemaDefinition<T>> {
  static create <T extends AnySchema> (type: T): ArraySchema<T> {
    return new ArraySchema({ type })
  }

  get type (): T {
    return this.definition.type
  }

  parse (input: unknown): Array<TypeOf<T>> {
    if (!Array.isArray(input)) {
      throw new Error('Input type must be an array')
    }
    return input.map(val => this.definition.type.parse(val))
  }
}
