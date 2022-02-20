import { ObjectType } from '../alias/ObjectType'
import { SchemaAny } from './alias/SchemaAny'
import { BaseSchema } from './BaseSchema'
import { ObjectDefinition } from './definition/ObjectDefinition'
import { OptionalSchemaMap } from './helper/OptionalSchemaMap'
import { TypeOfMap } from './helper/TypeOfMap'
import { OptionalSchema } from './OptionalSchema'
import { ValidationError } from './validation/ValidationError'

export class ObjectSchema<T extends ObjectType<SchemaAny>> extends BaseSchema<
  TypeOfMap<T>,
  ObjectDefinition<T>
> {
  readonly _kind: string = 'object'

  static create<T extends ObjectType<SchemaAny>>(
    properties: T
  ): ObjectSchema<T> {
    return new ObjectSchema({
      name: `{${Object.keys(properties)
        .map((key) => {
          const value = properties[key]
          return `${key}: ${value !== undefined ? value.name : ''}`
        })
        .join(', ')}}`,
      properties,
    })
  }

  get properties(): T {
    return this.definition.properties
  }

  override is(input: unknown): input is TypeOfMap<T> {
    const tInput = input as ObjectType<T>
    return (
      typeof input === 'object' &&
      input !== null &&
      Object.keys(this.properties)
        .map((key) => {
          const tKey = key as keyof T
          const schema = this.properties[tKey]
          return schema !== undefined ? schema.is(tInput[tKey]) : false
        })
        .filter((b) => !b).length === 0
    )
  }

  override validate(input: TypeOfMap<T>): ValidationError[] {
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

  partial(): ObjectSchema<OptionalSchemaMap<T>> {
    return ObjectSchema.create(
      Object.keys(this.properties).reduce(
        (prev, key) => ({
          ...prev,
          [key]: OptionalSchema.create(this.properties[key as keyof T]),
        }),
        {} as OptionalSchemaMap<T>
      )
    )
  }
}
