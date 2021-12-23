import { BaseSchema, TypeOfMap } from '../base'
import { TupleSchemaType } from '../tuple'
import { IntersectMap } from './IntersectMap'
import { IntersectSchemaDefinition } from './IntersectSchemaDefinition'

export class IntersectSchema<T extends TupleSchemaType> extends BaseSchema<IntersectMap<TypeOfMap<T>>, IntersectSchemaDefinition<T>> {
  static create <T extends TupleSchemaType> (items: T): IntersectSchema<T> {
    return new IntersectSchema({ items })
  }

  get items (): T {
    return this.definition.items
  }
}
