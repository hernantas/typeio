import { ConstructorType } from '../../alias/ConstructorType'
import { BaseSchemaDefinition } from './BaseSchemaDefinition'

export interface TypeSchemaDefinition<T> extends BaseSchemaDefinition {
  readonly type: ConstructorType<T>
}
