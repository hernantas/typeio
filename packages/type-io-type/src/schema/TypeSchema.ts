import { BaseSchema } from './BaseSchema'
import { ConstructorType } from '../alias/ConstructorType'
import { TypeDefinition } from './definition/TypeDefinition'

export class TypeSchema<T> extends BaseSchema<T, TypeDefinition<T>> {
  readonly _kind: string = 'type'

  static create<T>(constructor: ConstructorType<T>): TypeSchema<T> {
    return new TypeSchema({ name: constructor.name, type: constructor })
  }

  get type(): ConstructorType<T> {
    return this.definition.type
  }

  override is(input: unknown): input is T {
    return input instanceof this.definition.type
  }
}
