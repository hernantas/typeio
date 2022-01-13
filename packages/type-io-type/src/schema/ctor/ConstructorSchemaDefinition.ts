import { ConstructorType } from '../../alias/ConstructorType'
import { BaseSchemaDefinition } from '../base/BaseSchemaDefinition'

export interface ConstructorSchemaDefinition<T> extends BaseSchemaDefinition<T> {
  readonly constructor: ConstructorType<T>
}
