import { AnySchema } from '..'
import { UnionType } from '../alias/UnionType'
import { BaseSchema } from './BaseSchema'
import { UnionDefinition } from './definition/UnionDefinition'
import { TypeOfMap } from './helper/TypeOfMap'
import { UnionMap } from '../alias/helper/UnionMap'

export class UnionSchema<T extends UnionType<AnySchema>> extends BaseSchema<
  UnionMap<TypeOfMap<T>>,
  UnionDefinition<T>
> {
  static create<T extends UnionType<AnySchema>>(items: T): UnionSchema<T> {
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
