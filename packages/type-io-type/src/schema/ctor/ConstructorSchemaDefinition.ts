import { ConstructorType } from '../../alias'
import { BaseSchemaDefinition } from '../base'

export interface ConstructorSchemaDefinition<T> extends BaseSchemaDefinition<T> {
  readonly constructor: ConstructorType<T>
}
