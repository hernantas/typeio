import { CodecAny } from '../../../codec/alias/CodecAny'
import { IntersectCodecType } from '../../../codec/alias/IntersectCodecType'
import { IntersectCodec } from '../../../codec/IntersectCodec'
import { IntersectSchemaType } from '../../../schema/alias/IntersectSchemaType'
import { SchemaAny } from '../../../schema/alias/SchemaAny'
import { IntersectSchema } from '../../../schema/IntersectSchema'
import { CodecResolverFallback } from './CodecResolverFallback'

export function intersectResolver<S extends SchemaAny>(
  schema: IntersectSchema<IntersectSchemaType>,
  fallback: CodecResolverFallback
): CodecAny<S> {
  return new IntersectCodec(
    schema.items.map((s) => fallback(s)) as IntersectCodecType
  ) as unknown as CodecAny<S>
}