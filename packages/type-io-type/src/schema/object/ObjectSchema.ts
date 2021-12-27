import { ObjectPropertyMap } from '.'
import { ObjectType } from '../../alias'
import { BaseSchema, SchemaMap } from '../base'
import { ObjectSchemaDefinition } from './ObjectSchemaDefinition'

export class ObjectSchema<T extends ObjectType> extends BaseSchema<T, ObjectSchemaDefinition<T>> {
  static create <T extends ObjectType> (properties: SchemaMap<T>): ObjectSchema<T> {
    return new ObjectSchema({ properties })
  }

  get properties (): SchemaMap<T> {
    return this.definition.properties
  }

  parse (input: unknown): T {
    if (typeof input !== 'object') {
      throw new Error('Input type is not an object')
    }

    const result: Partial<T> = {}
    Object.keys(this.definition.properties).forEach(key => {
      const tKey = key as keyof T
      const value = (input as ObjectPropertyMap<T>)[tKey]
      result[tKey] = this.definition.properties[tKey].parse(value)
    })
    return result as T
  }
}
