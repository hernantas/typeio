import { ObjectSchemaType } from '../alias/ObjectSchemaType'
import { Definition } from './Definition'

export interface ObjectDefinition<T extends ObjectSchemaType>
  extends Definition {
  readonly properties: T
}
