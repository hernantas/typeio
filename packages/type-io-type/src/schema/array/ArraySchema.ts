import { AnySchema, BaseSchema, TypeOf } from '../base'
import { ArraySchemaDefinition } from './ArraySchemaDefinition'

export class ArraySchema<T extends AnySchema> extends BaseSchema<TypeOf<T>, ArraySchemaDefinition<T>> {
  static create <T extends AnySchema> (type: T): ArraySchema<T> {
    return new ArraySchema({ type })
  }

  get type (): T {
    return this.definition.type
  }
}
