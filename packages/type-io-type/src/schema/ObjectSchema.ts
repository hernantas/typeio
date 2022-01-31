import { BaseSchema } from './BaseSchema'
import { TypeOfMap } from './helper/TypeOfMap'
import { ObjectPropertyMap } from './helper/ObjectPropertyMap'
import { ObjectSchemaDefinition } from './definition/ObjectSchemaDefinition'
import { ObjectSchemaType } from './type/ObjectSchemaType'

export class ObjectSchema<T extends ObjectSchemaType> extends BaseSchema<
  TypeOfMap<T>,
  ObjectSchemaDefinition<T>
> {
  static create<T extends ObjectSchemaType>(properties: T): ObjectSchema<T> {
    return new ObjectSchema({
      name: `{${Object.keys(properties)
        .map((key) => {
          const value = properties[key]
          return value !== undefined ? value.name : ''
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
          const tInput = input as ObjectPropertyMap<T>
          const schema = this.definition.properties[tKey]
          return schema !== undefined ? schema.is(tInput[tKey]) : false
        })
        .filter((b) => !b).length === 0
    )
  }
}
