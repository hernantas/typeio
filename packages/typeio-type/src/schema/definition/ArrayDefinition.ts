import { SchemaAny } from '../alias/SchemaAny'
import { BaseDefinition } from './BaseDefinition'

export interface ArrayDefinition<T extends SchemaAny> extends BaseDefinition {
  /** Inner type */
  readonly type: T
}
