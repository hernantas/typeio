import { BaseSchema } from './BaseSchema'
import { TypeOfMap } from './helper/TypeOfMap'
import { IntersectMap } from './helper/IntersectMap'
import { IntersectSchemaDefinition } from './definition/IntersectSchemaDefinition'
import { IntersectSchemaType } from './type/IntersectSchemaType'

export class IntersectSchema<T extends IntersectSchemaType> extends BaseSchema<
  IntersectMap<TypeOfMap<T>>,
  IntersectSchemaDefinition<T>
> {
  static create<T extends IntersectSchemaType>(items: T): IntersectSchema<T> {
    return new IntersectSchema({
      name: items.map((v) => v.name).join(' & '),
      items,
    })
  }

  get items(): T {
    return this.definition.items
  }

  is(input: unknown): input is IntersectMap<TypeOfMap<T>> {
    for (const item of this.items) {
      if (!item.is(input)) return false
    }
    return true
  }
}
