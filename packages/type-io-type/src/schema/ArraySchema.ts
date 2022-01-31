import { AnySchema } from './AnySchema'
import { BaseSchema } from './BaseSchema'
import { TypeOf } from './helper/TypeOf'
import { ArraySchemaDefinition } from './definition/ArraySchemaDefinition'

export class ArraySchema<T extends AnySchema> extends BaseSchema<
  Array<TypeOf<T>>,
  ArraySchemaDefinition<T>
> {
  static create<T extends AnySchema>(type: T): ArraySchema<T> {
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
