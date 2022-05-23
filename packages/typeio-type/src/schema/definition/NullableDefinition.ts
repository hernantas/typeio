import { SchemaAny } from '../alias/SchemaAny'
import { Definition } from './Definition'

export interface NullableDefinition<T extends SchemaAny> extends Definition {
  readonly type: T
}
