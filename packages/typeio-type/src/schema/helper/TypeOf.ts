import { SchemaAny } from '../alias/SchemaAny'

/** Utility type to get `Schema` type */
export type TypeOf<T extends SchemaAny> = T['_type']
