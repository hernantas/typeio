import { AnySchema } from '../../schema/AnySchema'
import { Codec } from '../Codec'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyCodec = Codec<AnySchema, any, any>
