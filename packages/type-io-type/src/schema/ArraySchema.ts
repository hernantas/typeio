import { SchemaAny } from './alias/SchemaAny'
import { BaseSchema } from './BaseSchema'
import { ArrayDefinition } from './definition/ArrayDefinition'
import { TypeOf } from './helper/TypeOf'

export class ArraySchema<T extends SchemaAny> extends BaseSchema<
  Array<TypeOf<T>>,
  ArrayDefinition<T>
> {
  readonly _kind: string = 'array'

  static create<T extends SchemaAny>(type: T): ArraySchema<T> {
    return new ArraySchema({ name: `Array<${type.name}>`, type })
  }

  get type(): T {
    return this.definition.type
  }

  is(input: unknown): input is Array<TypeOf<T>> {
    return (
      Array.isArray(input) &&
      input.map((value) => this.definition.type.is(value)).filter((b) => !b)
        .length === 0
    )
  }

  min(limit: number): this {
    return this.check({
      name: 'ARRAY_LENGTH_MIN',
      args: { limit },
      validate: (value) => value.length >= limit,
    })
  }

  max(limit: number): this {
    return this.check({
      name: 'ARRAY_LENGTH_MAX',
      args: { limit },
      validate: (value) => value.length <= limit,
    })
  }

  length(limit: number): this {
    return this.check({
      name: 'ARRAY_LENGTH',
      args: { limit },
      validate: (value) => value.length === limit,
    })
  }
}
