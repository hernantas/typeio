import { SchemaAny } from './alias/SchemaAny'
import { TupleSchemaType } from './alias/TupleSchemaType'
import { BaseSchema } from './BaseSchema'
import { TupleDefinition } from './definition/TupleDefinition'
import { TypeOfMap } from './helper/TypeOfMap'
import { ValidationError } from './validation/ValidationError'

export class TupleSchema<T extends TupleSchemaType> extends BaseSchema<
  TypeOfMap<T>,
  TupleDefinition<T>
> {
  readonly _kind: string = 'tuple'

  static create<T extends TupleSchemaType>(items: T): TupleSchema<T> {
    return new TupleSchema({
      name: this.createName(items.map((i) => i.name)),
      items,
    })
  }

  static createName(itemsName: string[]): string {
    return `[${itemsName.join(', ')}]`
  }

  static isInstance(input: SchemaAny): input is TupleSchema<TupleSchemaType> {
    return input._kind === 'tuple'
  }

  get items(): T {
    return this.definition.items
  }

  override is(input: unknown): input is TypeOfMap<T> {
    return (
      Array.isArray(input) &&
      this.items
        .map((schema, index) => schema.is(input[index]))
        .filter((b) => !b).length === 0
    )
  }

  override validate(input: TypeOfMap<T>): ValidationError[] {
    return super.validate(input).concat(
      this.items.flatMap((item, index) =>
        item.validate(input[index]).map((error) => ({
          ...error,
          path: [index.toString()].concat(error.path ?? []),
        }))
      )
    )
  }
}
