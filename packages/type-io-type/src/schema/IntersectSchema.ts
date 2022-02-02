import { IntersectType } from '../alias/IntersectType'
import { AnySchema } from './AnySchema'
import { BaseSchema } from './BaseSchema'
import { IntersectDefinition } from './definition/IntersectDefinition'
import { IntersectMap } from './helper/IntersectMap'
import { TypeOfMap } from './helper/TypeOfMap'

export class IntersectSchema<
  T extends IntersectType<AnySchema>
> extends BaseSchema<IntersectMap<TypeOfMap<T>>, IntersectDefinition<T>> {
  static create<T extends IntersectType<AnySchema>>(
    items: T
  ): IntersectSchema<T> {
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
