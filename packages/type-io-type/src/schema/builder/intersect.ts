import { IntersectSchemaType } from '../alias/IntersectSchemaType'
import { IntersectSchema } from '../IntersectSchema'

export function intersect<T extends IntersectSchemaType>(
  items: T
): IntersectSchema<T> {
  return new IntersectSchema({
    name: items.map((v) => v.name).join(' & '),
    items,
  })
}
