import { ObjectType } from '../alias/ObjectType'
import { AnySchema } from './AnySchema'
import { BaseSchema } from './BaseSchema'
import { ObjectDefinition } from './definition/ObjectDefinition'
import { TypeOfMap } from './helper/TypeOfMap'

export class ObjectSchema<T extends ObjectType<AnySchema>> extends BaseSchema<
  TypeOfMap<T>,
  ObjectDefinition<T>
> {
  static create<T extends ObjectType<AnySchema>>(
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

  is(input: unknown): input is TypeOfMap<T> {
    return (
      typeof input === 'object' &&
      input !== null &&
      Object.keys(this.properties)
        .map((key) => {
          const tKey = key as keyof T
          const tInput = input as ObjectType<T>
          const schema = this.definition.properties[tKey]
          return schema !== undefined ? schema.is(tInput[tKey]) : false
        })
        .filter((b) => !b).length === 0
    )
  }
}
