import { ConstructorType } from '../../alias/ConstructorType'
import { BaseSchemaDefinition } from '../base/BaseSchemaDefinition'

export interface TypeSchemaDefinition<T> extends BaseSchemaDefinition<T> {
  readonly type: ConstructorType<T>
}
