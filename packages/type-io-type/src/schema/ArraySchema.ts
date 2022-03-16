import { SchemaAny } from './alias/SchemaAny'
import { BaseSchema } from './BaseSchema'
import { ArrayDefinition } from './definition/ArrayDefinition'
import { TypeOf } from './helper/TypeOf'
import { ValidationError } from './validation/ValidationError'

export class ArraySchema<T extends SchemaAny> extends BaseSchema<
  Array<TypeOf<T>>,
  ArrayDefinition<T>
> {
  readonly _kind: string = 'array'

  static create<T extends SchemaAny>(type: T): ArraySchema<T> {
    return new ArraySchema({ name: this.createName(type.name), type })
  }

  static createName(name: string): string {
    return `Array<${name}>`
  }

  static is(input: SchemaAny): input is ArraySchema<SchemaAny> {
    return input._kind === 'array'
  }

  get type(): T {
    return this.definition.type
  }

  override is(input: unknown): input is Array<TypeOf<T>> {
    return (
      Array.isArray(input) &&
      input.map((value) => this.type.is(value)).filter((b) => !b).length === 0
    )
  }

  override validate(input: TypeOf<T>[]): ValidationError[] {
    return super.validate(input).concat(
      input.flatMap((value, index) =>
        this.type.validate(value).map((error) => ({
          ...error,
          path: [index.toString()].concat(error.path ?? []),
        }))
      )
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
