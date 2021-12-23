import { ConstructorType } from '../../alias'
import { BaseSchemaDefinition } from '../base'

export interface ConstructorSchemaDefinition<T> extends BaseSchemaDefinition {
  readonly constructor: ConstructorType<T>
}
