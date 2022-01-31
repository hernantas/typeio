import { AnyCodec } from '../default/AnyCodec'

export type SchemaOf<T extends AnyCodec> = T['schema']
