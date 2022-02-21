import { CodecAny } from '../../../codec/alias/CodecAny'
import { NullableCodec } from '../../../codec/NullableCodec'
import { SchemaAny } from '../../../schema/alias/SchemaAny'
import { NullableSchema } from '../../../schema/NullableSchema'
import { CodecResolverFallback } from './CodecResolverFallback'

export function nullableResolver<S extends NullableSchema<SchemaAny>>(
  schema: S,
  fallback: CodecResolverFallback
): CodecAny<S> {
  return new NullableCodec(fallback(schema.type)) as unknown as CodecAny<S>
}
