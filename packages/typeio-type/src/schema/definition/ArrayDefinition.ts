import { SchemaAny } from '../alias/SchemaAny'
import { Definition } from './Definition'

export interface ArrayDefinition<T extends SchemaAny> extends Definition {
  /** Inner type */
  readonly type: T
}
