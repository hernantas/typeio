import { CodecAny } from '../../../codec/alias/CodecAny'
import { UnionCodecType } from '../../../codec/alias/UnionCodecType'
import { UnionCodec } from '../../../codec/UnionCodec'
import { SchemaAny } from '../../../schema/alias/SchemaAny'
import { UnionSchemaType } from '../../../schema/alias/UnionSchemaType'
import { UnionSchema } from '../../../schema/UnionSchema'
import { CodecResolverFallback } from './CodecResolverFallback'

export function unionResolver<S extends SchemaAny>(
  schema: UnionSchema<UnionSchemaType>,
  fallback: CodecResolverFallback
): CodecAny<S> {
  return new UnionCodec(
    schema.items.map((s) => fallback(s)) as UnionCodecType
  ) as unknown as CodecAny<S>
}
