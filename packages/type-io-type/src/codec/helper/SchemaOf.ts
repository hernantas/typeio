import { CodecAny } from '../alias/CodecAny'

export type SchemaOf<T extends CodecAny> = T['schema']
