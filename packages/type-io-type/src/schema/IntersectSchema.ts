import { IntersectMap } from '../alias/helper/IntersectMap'
import { IntersectType } from '../alias/IntersectType'
import { SchemaAny } from './alias/SchemaAny'
import { BaseSchema } from './BaseSchema'
import { IntersectDefinition } from './definition/IntersectDefinition'
import { TypeOfMap } from './helper/TypeOfMap'

export class IntersectSchema<
  T extends IntersectType<SchemaAny>
> extends BaseSchema<IntersectMap<TypeOfMap<T>>, IntersectDefinition<T>> {
  static create<T extends IntersectType<SchemaAny>>(
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
