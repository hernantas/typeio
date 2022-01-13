import { BaseSchema } from '../base/BaseSchema'
import { TypeOfMap } from '../base/TypeOfMap'
import { UnionMap } from './UnionMap'
import { UnionSchemaDefinition } from './UnionSchemaDefinition'
import { UnionSchemaType } from './UnionSchemaType'

export class UnionSchema<T extends UnionSchemaType> extends BaseSchema<UnionMap<TypeOfMap<T>>, UnionSchemaDefinition<T>> {
  static create <T extends UnionSchemaType> (items: T): UnionSchema<T> {
    return new UnionSchema({ items })
  }

  get items (): T {
    return this.definition.items
  }

  is (input: unknown): input is UnionMap<TypeOfMap<T>> {
    for (const schema of this.definition.items) {
      if (schema.is(input)) return true
    }
    return false
  }
}
