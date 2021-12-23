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
}
