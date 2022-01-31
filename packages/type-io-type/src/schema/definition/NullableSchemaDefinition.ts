import { AnySchema } from '../AnySchema'
import { BaseSchemaDefinition } from './BaseSchemaDefinition'

export interface NullableSchemaDefinition<T extends AnySchema>
  extends BaseSchemaDefinition {
  readonly type: T
}
