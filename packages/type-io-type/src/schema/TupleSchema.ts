import { TupleType } from '../alias/TupleType'
import { SchemaAny } from './alias/SchemaAny'
import { BaseSchema } from './BaseSchema'
import { TupleDefinition } from './definition/TupleDefinition'
import { TypeOfMap } from './helper/TypeOfMap'

export class TupleSchema<T extends TupleType<SchemaAny>> extends BaseSchema<
  TypeOfMap<T>,
  TupleDefinition<T>
> {
  static create<T extends TupleType<SchemaAny>>(items: T): TupleSchema<T> {
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
