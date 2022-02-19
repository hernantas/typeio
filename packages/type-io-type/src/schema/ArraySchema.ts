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
      input.map((v) => this.definition.type.is(v)).filter((b) => !b).length ===
        0
    )
  }

  min(limit: number): this {
    return this.check({
      name: 'ARRAY_LENGTH_MIN',
      args: { limit },
      validate: (v) => v.length >= limit,
    })
  }

  max(limit: number): this {
    return this.check({
      name: 'ARRAY_LENGTH_MAX',
      args: { limit },
      validate: (v) => v.length <= limit,
    })
  }

  length(limit: number): this {
    return this.check({
      name: 'ARRAY_LENGTH',
      args: { limit },
      validate: (v) => v.length === limit,
    })
  }
}
