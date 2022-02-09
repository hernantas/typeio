import { SchemaAny } from './alias/SchemaAny'
import { BaseSchema } from './BaseSchema'
import { ArrayDefinition } from './definition/ArrayDefinition'
import { TypeOf } from './helper/TypeOf'

export class ArraySchema<T extends SchemaAny> extends BaseSchema<
  Array<TypeOf<T>>,
  ArrayDefinition<T>
> {
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

  min(value: number): this {
    return this.check((v) => v.length >= value, { kind: 'ARRAY_LENGTH_MIN' })
  }

  max(value: number): this {
    return this.check((v) => v.length <= value, { kind: 'ARRAY_LENGTH_MAX' })
  }

  length(value: number): this {
    return this.check((v) => v.length === value, { kind: 'ARRAY_LENGTH' })
  }
}
