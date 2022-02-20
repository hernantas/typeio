import { ConstructorType } from '../../alias/ConstructorType'
import { SchemaMap } from '../helper/SchemaMap'
import { BaseDefinition } from './BaseDefinition'

export interface TypeDefinition<T> extends BaseDefinition {
  readonly type: ConstructorType<T>

  readonly properties: Partial<SchemaMap<T>>
}
