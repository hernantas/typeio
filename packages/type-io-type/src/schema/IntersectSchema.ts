import { IntersectMap } from '../alias/helper/IntersectMap'
import { IntersectSchemaType } from './alias/IntersectSchemaType'
import { BaseSchema } from './BaseSchema'
import { IntersectDefinition } from './definition/IntersectDefinition'
import { TypeOfMap } from './helper/TypeOfMap'
import { ValidationError } from './validation/ValidationError'

export class IntersectSchema<T extends IntersectSchemaType> extends BaseSchema<
  IntersectMap<TypeOfMap<T>>,
  IntersectDefinition<T>
> {
  readonly _kind: string = 'intersect'

  static create<T extends IntersectSchemaType>(items: T): IntersectSchema<T> {
    return new IntersectSchema({
      name: items.map((v) => v.name).join(' & '),
      items,
    })
  }

  get items(): T {
    return this.definition.items
  }

  override is(input: unknown): input is IntersectMap<TypeOfMap<T>> {
    for (const item of this.items) {
      if (!item.is(input)) return false
    }
    return true
  }

  override validate(input: IntersectMap<TypeOfMap<T>>): ValidationError[] {
    return super
      .validate(input)
      .concat(this.items.flatMap((item) => item.validate(input)))
  }
}
