import { SchemaAny } from '../schema/alias/SchemaAny'

export interface ResolverFallback {
  <S extends SchemaAny>(schema: S): unknown
}
