import { BaseSchema } from './BaseSchema'
import { TypeOfMap } from './helper/TypeOfMap'
import { UnionMap } from './helper/UnionMap'
import { UnionDefinition } from './definition/UnionDefinition'
import { UnionSchemaType } from './type/UnionSchemaType'

export class UnionSchema<T extends UnionSchemaType> extends BaseSchema<
  UnionMap<TypeOfMap<T>>,
  UnionDefinition<T>
> {
  static create<T extends UnionSchemaType>(items: T): UnionSchema<T> {
    return new UnionSchema({
      name: items.map((v) => v.name).join(' | '),
      items,
    })
  }

  get items(): T {
    return this.definition.items
  }

  is(input: unknown): input is UnionMap<TypeOfMap<T>> {
    for (const schema of this.definition.items) {
      if (schema.is(input)) return true
    }
    return false
  }
}
