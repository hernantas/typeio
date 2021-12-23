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
}
