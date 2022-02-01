import { BaseSchema } from './BaseSchema'
import { TypeOfMap } from './helper/TypeOfMap'
import { TupleDefinition } from './definition/TupleDefinition'
import { TupleSchemaType } from './type/TupleSchemaType'

export class TupleSchema<T extends TupleSchemaType> extends BaseSchema<
  TypeOfMap<T>,
  TupleDefinition<T>
> {
  static create<T extends TupleSchemaType>(items: T): TupleSchema<T> {
    return new TupleSchema({
      name: `[${items.map((v) => v.name).join(', ')}]`,
      items,
    })
  }

  get items(): T {
    return this.definition.items
  }

  is(input: unknown): input is TypeOfMap<T> {
    return (
      Array.isArray(input) &&
      this.definition.items
        .map((schema, index) => schema.is(input[index]))
        .filter((b) => !b).length === 0
    )
  }
}
