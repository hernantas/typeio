import { BaseSchema } from '../base/BaseSchema'
import { ConstructorType } from '../../alias/ConstructorType'
import { TypeSchemaDefinition } from './TypeSchemaDefinition'

export class TypeSchema<T> extends BaseSchema<T, TypeSchemaDefinition<T>> {
  static create <T> (constructor: ConstructorType<T>): TypeSchema<T> {
    return new TypeSchema(constructor.name, { type: constructor })
  }

  is (input: unknown): input is T {
    return input instanceof this.definition.type
  }
}
