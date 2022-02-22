import { CodecAny } from '../../../codec/alias/CodecAny'
import { OptionalCodec } from '../../../codec/OptionalCodec'
import { SchemaAny } from '../../../schema/alias/SchemaAny'
import { OptionalSchema } from '../../../schema/OptionalSchema'
import { CodecResolverFallback } from './CodecResolverFallback'

export function optionalResolver<S extends SchemaAny>(
  schema: OptionalSchema<SchemaAny>,
  fallback: CodecResolverFallback
): CodecAny<S> {
  return new OptionalCodec(fallback(schema.type)) as unknown as CodecAny<S>
}
