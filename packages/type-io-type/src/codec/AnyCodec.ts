import { SchemaAny } from '../schema/alias/SchemaAny'
import { Codec } from './interface/Codec'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyCodec<T extends SchemaAny = SchemaAny> = Codec<T, any, any>
