import { SchemaAny } from '../schema/alias/SchemaAny'
import { ResolverFallback } from './ResolverFallback'

export interface Resolver<S extends SchemaAny = SchemaAny, R = unknown> {
  is(schema: SchemaAny): schema is S
  resolve(schema: S, fallback: ResolverFallback): R
}
