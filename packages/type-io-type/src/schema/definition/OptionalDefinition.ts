import { SchemaAny } from '../alias/SchemaAny'
import { BaseDefinition } from './BaseDefinition'

export interface OptionalDefinition<T extends SchemaAny>
  extends BaseDefinition {
  readonly type: T
}
