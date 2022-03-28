import { Definition } from './Definition'
import { LiteralType } from '../../alias/LiteralType'

export interface LiteralDefinition<T extends LiteralType> extends Definition {
  readonly value: T
}
