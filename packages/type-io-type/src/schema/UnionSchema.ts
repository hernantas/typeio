import { BaseSchema } from './BaseSchema'
import { TypeOfMap } from './base/TypeOfMap'
import { UnionMap } from './union/UnionMap'
import { UnionSchemaDefinition } from './definition/UnionSchemaDefinition'
import { UnionSchemaType } from './union/UnionSchemaType'

export class UnionSchema<T extends UnionSchemaType> extends BaseSchema<UnionMap<TypeOfMap<T>>, UnionSchemaDefinition<T>> {
  static create <T extends UnionSchemaType> (items: T): UnionSchema<T> {
    return new UnionSchema({ name: items.map(v => v.name).join(' | '), items })
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