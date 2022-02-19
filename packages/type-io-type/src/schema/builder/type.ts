import { ConstructorType } from '../../alias/ConstructorType'
import { TypeSchema } from '../TypeSchema'

export function type<T>(constructor: ConstructorType<T>): TypeSchema<T> {
  return TypeSchema.create(constructor)
}
