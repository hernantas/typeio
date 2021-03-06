import { UnionMap } from '../alias/helper/UnionMap'
import { SchemaAny } from './alias/SchemaAny'
import { UnionSchemaType } from './alias/UnionSchemaType'
import { Schema } from './Schema'
import { UnionDefinition } from './definition/UnionDefinition'
import { TypeOfMap } from './helper/TypeOfMap'
import { ValidationError } from './validation/ValidationError'

export class UnionSchema<T extends UnionSchemaType> extends Schema<
  UnionMap<TypeOfMap<T>>,
  UnionDefinition<T>
> {
  readonly _kind: string = 'union'

  static create<T extends UnionSchemaType>(items: T): UnionSchema<T> {
    return new UnionSchema({
      name: this.createName(items.map((i) => i.name)),
      items,
    })
  }

  static createName(itemsName: string[]): string {
    return itemsName.join(' | ')
  }

  static isInstance(input: SchemaAny): input is UnionSchema<UnionSchemaType> {
    return input._kind === 'union'
  }

  get items(): T {
    return this.definition.items
  }

  override is(input: unknown): input is UnionMap<TypeOfMap<T>> {
    for (const schema of this.items) {
      if (schema.is(input)) return true
    }
    return false
  }

  override validate(input: UnionMap<TypeOfMap<T>>): ValidationError[] {
    return super
      .validate(input)
      .concat(
        this.items
          .filter((item) => item.is(input))
          .flatMap((item) => item.validate(input))
      )
  }
}
