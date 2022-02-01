import { ConstructorType } from '../../alias/ConstructorType'
import { BaseDefinition } from './BaseDefinition'

export interface TypeDefinition<T> extends BaseDefinition {
  readonly type: ConstructorType<T>
}
