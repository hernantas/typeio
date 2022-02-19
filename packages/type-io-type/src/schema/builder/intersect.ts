import { IntersectType } from '../../alias/IntersectType'
import { SchemaAny } from '../alias/SchemaAny'
import { IntersectSchema } from '../IntersectSchema'

export function intersect<T extends IntersectType<SchemaAny>>(
  items: T
): IntersectSchema<T> {
  return new IntersectSchema({
    name: items.map((v) => v.name).join(' & '),
    items,
  })
}
