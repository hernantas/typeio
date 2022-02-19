import { UnionMap } from '../alias/helper/UnionMap'
import { UnionType } from '../alias/UnionType'
import { SchemaAny } from './alias/SchemaAny'
import { BaseSchema } from './BaseSchema'
import { UnionDefinition } from './definition/UnionDefinition'
import { TypeOfMap } from './helper/TypeOfMap'
import { ValidationError } from './validation/ValidationError'

export class UnionSchema<T extends UnionType<SchemaAny>> extends BaseSchema<
  UnionMap<TypeOfMap<T>>,
  UnionDefinition<T>
> {
  readonly _kind: string = 'union'

  static create<T extends UnionType<SchemaAny>>(items: T): UnionSchema<T> {
    return new UnionSchema({
      name: items.map((v) => v.name).join(' | '),
      items,
    })
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
        ...this.items
          .filter((item) => item.is(input))
          .flatMap((item) => item.validate(input))
      )
  }
}
