import { UnionType } from '../../alias/UnionType'
import { AnySchema } from '../AnySchema'

export type IntersectSchemaType = UnionType<AnySchema>
