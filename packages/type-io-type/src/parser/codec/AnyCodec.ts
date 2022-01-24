import { AnySchema } from '../../schema/base/AnySchema'
import { Codec } from './Codec'

export type AnyCodec = Codec<AnySchema, any, any>
