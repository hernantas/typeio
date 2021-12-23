import { ConstructorSchemaDefinition } from './ConstructorSchemaDefinition'
import { BaseSchema } from '../base'
import { ConstructorType } from 'type-io-type/src/alias'

export class ConstructorSchema<T> extends BaseSchema<T, ConstructorSchemaDefinition<T>> {
  static create <T> (constructor: ConstructorType<T>): ConstructorSchema<T> {
    return new ConstructorSchema({ constructor })
  }
}
