import { ArraySchema } from './ArraySchema'
import { BaseSchema } from './BaseSchema'
import { Definition } from './definition/Definition'
import { NullableSchema } from './NullableSchema'
import { OptionalSchema } from './OptionalSchema'

export abstract class Schema<
  T,
  D extends Definition = Definition
> extends BaseSchema<T, D> {
  array(): ArraySchema<this> {
    return ArraySchema.create(this)
  }

  nullable(): NullableSchema<this> {
    return NullableSchema.create(this)
  }

  optional(): OptionalSchema<this> {
    return OptionalSchema.create(this)
  }
}
