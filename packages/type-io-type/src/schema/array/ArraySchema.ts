import { AnySchema } from '../base/AnySchema'
import { BaseSchema } from '../base/BaseSchema'
import { TypeOf } from '../base/TypeOf'
import { ArraySchemaDefinition } from './ArraySchemaDefinition'

export class ArraySchema<T extends AnySchema> extends BaseSchema<Array<TypeOf<T>>, ArraySchemaDefinition<T>> {
  static create <T extends AnySchema> (type: T): ArraySchema<T> {
    return new ArraySchema({ type })
  }

  get type (): T {
    return this.definition.type
  }

  is (input: unknown): input is Array<TypeOf<T>> {
    return Array.isArray(input) && input.map(v => this.definition.type.is(v)).length === input.length
  }

  min (value: number): this {
    return this.addRule(v => v.length >= value, { kind: 'ARRAY_LENGTH_MIN' })
  }

  max (value: number): this {
    return this.addRule(v => v.length <= value, { kind: 'ARRAY_LENGTH_MAX' })
  }

  length (value: number): this {
    return this.addRule(v => v.length === value, { kind: 'ARRAY_LENGTH' })
  }
}
