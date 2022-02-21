import { IntersectSchemaType } from '../alias/IntersectSchemaType'
import { BaseDefinition } from './BaseDefinition'

export interface IntersectDefinition<T extends IntersectSchemaType>
  extends BaseDefinition {
  readonly items: T
}
