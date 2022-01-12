import { BaseSchema, TypeOfMap } from '../base'
import { IntersectMap } from './IntersectMap'
import { IntersectSchemaDefinition } from './IntersectSchemaDefinition'
import { IntersectSchemaType } from './IntersectSchemaType'

export class IntersectSchema<T extends IntersectSchemaType>
  extends BaseSchema<IntersectMap<TypeOfMap<T>>, IntersectSchemaDefinition<T>> {
  static create <T extends IntersectSchemaType> (items: T): IntersectSchema<T> {
    return new IntersectSchema({ items })
  }

  get items (): T {
    return this.definition.items
  }

  is (input: unknown): input is IntersectMap<TypeOfMap<T>> {
    throw new Error('Method not implemented.')
  }
}
