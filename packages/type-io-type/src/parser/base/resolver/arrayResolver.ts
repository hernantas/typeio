import { CodecAny } from '../../../codec/alias/CodecAny'
import { ArrayCodec } from '../../../codec/ArrayCodec'
import { SchemaAny } from '../../../schema/alias/SchemaAny'
import { ArraySchema } from '../../../schema/ArraySchema'
import { CodecResolverFallback } from './CodecResolverFallback'

export function arrayResolver<S extends ArraySchema<SchemaAny>>(
  schema: S,
  fallback: CodecResolverFallback
): CodecAny<S> {
  return new ArrayCodec(fallback(schema.type)) as unknown as CodecAny<S>
}
