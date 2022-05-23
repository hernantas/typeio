import { UnionSchemaType } from '../alias/UnionSchemaType'
import { Definition } from './Definition'

export interface UnionDefinition<T extends UnionSchemaType> extends Definition {
  readonly items: T
}
