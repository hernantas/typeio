import { SchemaAny } from '../alias/SchemaAny'
import { BaseDefinition } from './BaseDefinition'

export interface NullableDefinition<T extends SchemaAny>
  extends BaseDefinition {
  readonly type: T
}
