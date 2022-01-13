import { BaseSchema } from '../base/BaseSchema'
import { ConstructorType } from '../../alias/ConstructorType'
import { ConstructorSchemaDefinition } from './ConstructorSchemaDefinition'

export class ConstructorSchema<T> extends BaseSchema<T, ConstructorSchemaDefinition<T>> {
  static create <T> (constructor: ConstructorType<T>): ConstructorSchema<T> {
    return new ConstructorSchema({ constructor })
  }

  is (input: unknown): input is T {
    return input instanceof this.definition.constructor
  }
}
