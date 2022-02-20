import { ConstructorType } from '../alias/ConstructorType'
import { getMetadata } from '../decorator/metadata'
import { BaseSchema } from './BaseSchema'
import { TypeDefinition } from './definition/TypeDefinition'
import { SchemaMap } from './helper/SchemaMap'

export class TypeSchema<T> extends BaseSchema<T, TypeDefinition<T>> {
  readonly _kind: string = 'type'

  static create<T>(constructor: ConstructorType<T>): TypeSchema<T> {
    return new TypeSchema({
      name: constructor.name,
      type: constructor,
      properties: getMetadata(constructor),
    })
  }

  get type(): ConstructorType<T> {
    return this.definition.type
  }

  get properties(): Partial<SchemaMap<T>> {
    return this.definition.properties
  }

  override is(input: unknown): input is T {
    return input instanceof this.type
  }
}
