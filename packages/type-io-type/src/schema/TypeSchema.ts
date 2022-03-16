import { ConstructorType } from '../alias/ConstructorType'
import { getMetadata } from '../decorator/metadata'
import { SchemaAny } from './alias/SchemaAny'
import { BaseSchema } from './BaseSchema'
import { TypeDefinition } from './definition/TypeDefinition'
import { SchemaMap } from './helper/SchemaMap'
import { ValidationError } from './validation/ValidationError'

export class TypeSchema<T> extends BaseSchema<T, TypeDefinition<T>> {
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

  static is(input: SchemaAny): input is TypeSchema<unknown> {
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
      Object.keys(this.properties).flatMap((key) => {
        const tKey = key as keyof T
        const schema = this.properties[tKey]
        return schema !== undefined
          ? schema.validate(input[tKey]).map((error) => ({
              ...error,
              path: [key].concat(error.path ?? []),
            }))
          : []
      })
    )
  }
}
