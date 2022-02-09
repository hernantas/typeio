import { UnionType } from '../../alias/UnionType'
import { SchemaAny } from '../alias/SchemaAny'
import { BaseDefinition } from './BaseDefinition'

export interface UnionDefinition<T extends UnionType<SchemaAny>>
  extends BaseDefinition {
  readonly items: T
}
