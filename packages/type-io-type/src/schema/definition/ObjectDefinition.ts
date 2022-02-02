import { ObjectType } from '../../alias/ObjectType'
import { AnySchema } from '../AnySchema'
import { BaseDefinition } from './BaseDefinition'

export interface ObjectDefinition<T extends ObjectType<AnySchema>>
  extends BaseDefinition {
  readonly properties: T
}
