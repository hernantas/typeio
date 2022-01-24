import { BaseSchema } from './BaseSchema'
import { ConstructorType } from '../alias/ConstructorType'
import { TypeSchemaDefinition } from './definition/TypeSchemaDefinition'

export class TypeSchema<T> extends BaseSchema<T, TypeSchemaDefinition<T>> {
  static create <T> (constructor: ConstructorType<T>): TypeSchema<T> {
    return new TypeSchema({ name: constructor.name, type: constructor })
  }

  is (input: unknown): input is T {
    return input instanceof this.definition.type
  }
}
