import { ConstructorType } from '../../alias'
import { BaseSchema } from '../base'
import { ConstructorSchemaDefinition } from './ConstructorSchemaDefinition'

export class ConstructorSchema<T> extends BaseSchema<T, ConstructorSchemaDefinition<T>> {
  static create <T> (constructor: ConstructorType<T>): ConstructorSchema<T> {
    return new ConstructorSchema({ constructor })
  }
}
