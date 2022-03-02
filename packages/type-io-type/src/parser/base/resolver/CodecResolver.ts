import { CodecAny } from '../../../codec/alias/CodecAny'
import { SchemaAny } from '../../../schema/alias/SchemaAny'
import { CodecResolverFallback } from './CodecResolverFallback'

export interface CodecResolver<S extends SchemaAny = SchemaAny> {
  is(schema: SchemaAny): schema is S

  resolve(schema: S, fallback: CodecResolverFallback): CodecAny<S>
}
