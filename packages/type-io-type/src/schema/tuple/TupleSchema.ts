import { BaseSchema, TypeOfMap } from '../base'
import { TupleSchemaDefinition } from './TupleSchemaDefinition'
import { TupleSchemaType } from './TupleSchemaType'

export class TupleSchema<T extends TupleSchemaType> extends BaseSchema<TypeOfMap<T>, TupleSchemaDefinition<T>> {
  static create <T extends TupleSchemaType> (items: T): TupleSchema<T> {
    return new TupleSchema({ items })
  }

  get items (): T {
    return this.definition.items
  }

  parse (input: unknown): TypeOfMap<T> {
    if (!Array.isArray(input)) {
      throw new Error('Input is not an array')
    }

    if (input.length !== this.definition.items.length) {
      throw new Error(`Input array do not have "${this.definition.items.length}" length`)
    }

    return this
      .definition
      .items
      .map((schema, index) => schema.parse(input[index])) as TypeOfMap<T>
  }
}
