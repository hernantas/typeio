import { IntersectSchemaType } from '../alias/IntersectSchemaType'
import { Definition } from './Definition'

export interface IntersectDefinition<T extends IntersectSchemaType>
  extends Definition {
  readonly items: T
}
