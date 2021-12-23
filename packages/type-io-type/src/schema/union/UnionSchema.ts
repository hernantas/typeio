import { BaseSchema, TypeOfMap } from '..'
import { TupleSchemaType } from '../tuple'
import { UnionMap } from './UnionMap'
import { UnionSchemaDefinition } from './UnionSchemaDefinition'

export class UnionSchema<T extends TupleSchemaType> extends BaseSchema<UnionMap<TypeOfMap<T>>, UnionSchemaDefinition<T>> {
  static create <T extends TupleSchemaType> (items: T): UnionSchema<T> {
    return new UnionSchema({ items })
  }

  get items (): T {
    return this.definition.items
  }
}
