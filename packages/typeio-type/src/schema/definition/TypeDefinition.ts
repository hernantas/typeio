import { ConstructorType } from '../../alias/ConstructorType'
import { SchemaMap } from '../helper/SchemaMap'
import { Definition } from './Definition'

export interface TypeDefinition<T> extends Definition {
  readonly type: ConstructorType<T>

  readonly properties: Partial<SchemaMap<T>>
}
