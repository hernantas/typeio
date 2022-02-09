import { IntersectType } from '../../alias/IntersectType'
import { SchemaAny } from '../alias/SchemaAny'
import { BaseDefinition } from './BaseDefinition'

export interface IntersectDefinition<T extends IntersectType<SchemaAny>>
  extends BaseDefinition {
  readonly items: T
}
