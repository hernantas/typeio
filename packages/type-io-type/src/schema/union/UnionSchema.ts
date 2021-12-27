import { BaseSchema, TypeOfMap } from '../base'
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

  parse (input: unknown): UnionMap<TypeOfMap<T>> {
    for (let i = 0; i < this.definition.items.length; i++) {
      try {
        return this.definition.items[i]?.parse(input) as TypeOfMap<T>[typeof i]
      } catch (err) {}
    }

    throw new Error(`No parser can parse the value, only "${this.definition.items.join('|')}" can be parsed`)
  }
}
