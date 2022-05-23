import { ConstructorType } from '../alias/ConstructorType'
import { getMetadata } from '../decorator/metadata'
import { SchemaAny } from './alias/SchemaAny'
import { Schema } from './Schema'
import { TypeDefinition } from './definition/TypeDefinition'
import { SchemaMap } from './helper/SchemaMap'
import { ValidationError } from './validation/ValidationError'

export class TypeSchema<T> extends Schema<T, TypeDefinition<T>> {
  readonly _kind: string = 'type'

  static create<T>(constructor: ConstructorType<T>): TypeSchema<T> {
    return new TypeSchema({
      name: this.createName(constructor.name),
      type: constructor,
      properties: getMetadata(constructor),
    })
  }

  static createName(ctorName: string): string {
    return ctorName
  }

  static isInstance(input: SchemaAny): input is TypeSchema<unknown> {
    return input._kind === 'type'
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

  override validate(input: T): ValidationError[] {
    return super.validate(input).concat(
      Object.entries<Schema<T[keyof T]> | undefined>(this.properties).flatMap(
        ([key, schema]) =>
          schema !== undefined
            ? schema.validate(input[key as keyof T]).map((error) => ({
                ...error,
                path: [key].concat(error.path ?? []),
              }))
            : []
      )
    )
  }
}
