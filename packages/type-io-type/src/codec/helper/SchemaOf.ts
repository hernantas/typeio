import { AnyCodec } from '../AnyCodec'

export type SchemaOf<T extends AnyCodec> = T['schema']
