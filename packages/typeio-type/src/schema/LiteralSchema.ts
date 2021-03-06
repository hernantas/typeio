import { LiteralType } from '../alias/LiteralType'
import { SchemaAny } from './alias/SchemaAny'
import { Schema } from './Schema'
import { LiteralDefinition } from './definition/LiteralDefinition'

export class LiteralSchema<T extends LiteralType> extends Schema<
  T,
  LiteralDefinition<T>
> {
  readonly _kind: string = 'literal'

  static create<T extends LiteralType>(value: T): LiteralSchema<T> {
    return new LiteralSchema({ name: this.createName(value.toString()), value })
  }

  static createName(name: string): string {
    return `'${name.toString()}'`
  }

  static isInstance(input: SchemaAny): input is LiteralSchema<LiteralType> {
    return input._kind === 'literal'
  }

  get value(): T {
    return this.definition.value
  }

  override is(input: unknown): input is T {
    return input === this.value
  }
}
