import { SchemaAny } from '../alias/SchemaAny'
import { Definition } from './Definition'

export interface OptionalDefinition<T extends SchemaAny> extends Definition {
  readonly type: T
}
