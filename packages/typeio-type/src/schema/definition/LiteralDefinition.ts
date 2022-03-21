import { BaseDefinition } from './BaseDefinition'
import { LiteralType } from '../../alias/LiteralType'

export interface LiteralDefinition<T extends LiteralType>
  extends BaseDefinition {
  readonly value: T
}
