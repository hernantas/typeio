import { BaseSchema } from '../base/BaseSchema'
import { TypeOfMap } from '../base/TypeOfMap'
import { TupleSchemaDefinition } from './TupleSchemaDefinition'
import { TupleSchemaType } from './TupleSchemaType'

export class TupleSchema<T extends TupleSchemaType> extends BaseSchema<TypeOfMap<T>, TupleSchemaDefinition<T>> {
  static create <T extends TupleSchemaType> (items: T): TupleSchema<T> {
    return new TupleSchema({ items })
  }

  get items (): T {
    return this.definition.items
  }

  is (input: unknown): input is TypeOfMap<T> {
    return Array.isArray(input) && this
      .definition
      .items
      .map((schema, index) => schema.is(input[index]))
      .filter(b => !b)
      .length === 0
  }

  override parse (input: unknown): TypeOfMap<T> {
    if (!Array.isArray(input)) {
      throw new Error('Parse error')
    }
    return this
      .definition
      .items
      .map((schema, index) => schema.parse(input[index])) as TypeOfMap<T>
  }
}
