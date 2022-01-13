import { BaseSchema } from '../base/BaseSchema'
import { TypeOf } from '../base/TypeOf'
import { TypeOfMap } from '../base/TypeOfMap'
import { ObjectPropertyMap } from './ObjectPropertyMap'
import { ObjectSchemaDefinition } from './ObjectSchemaDefinition'
import { ObjectSchemaType } from './ObjectSchemaType'

export class ObjectSchema<T extends ObjectSchemaType> extends BaseSchema<TypeOfMap<T>, ObjectSchemaDefinition<T>> {
  static create <T extends ObjectSchemaType> (properties: T): ObjectSchema<T> {
    return new ObjectSchema({ properties })
  }

  get properties (): T {
    return this.definition.properties
  }

  is (input: unknown): input is TypeOfMap<T> {
    return typeof input === 'object' &&
      input !== null &&
      Object
        .keys(this.properties)
        .map(key => {
          const tKey = key as keyof T
          const tInput = input as ObjectPropertyMap<T>
          const schema = this.definition.properties[tKey]
          return schema !== undefined ? schema.is(tInput[tKey]) : false
        })
        .filter(b => !b)
        .length === 0
  }

  override parse (input: unknown): TypeOfMap<T> {
    if (typeof input !== 'object') {
      throw new Error('Input type is not an object')
    }

    const result: Partial<TypeOfMap<T>> = {}
    Object.keys(this.definition.properties)
      .forEach(key => {
        const tKey = key as keyof T
        const schema = this.definition.properties[tKey]
        if (schema !== undefined) {
          result[tKey] = schema.parse((input as ObjectPropertyMap<T>)[tKey]) as TypeOf<this>[keyof T]
        }
      })
    return result as TypeOfMap<T>
  }
}
