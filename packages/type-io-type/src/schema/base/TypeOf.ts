import { AnySchema } from './AnySchema'

/**
 * Utility type to get `Schema` type
 */
export type TypeOf<T extends AnySchema> = T['_type']
