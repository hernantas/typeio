import { CodecAny } from '../../../codec/alias/CodecAny'
import { TupleCodecType } from '../../../codec/alias/TupleCodecType'
import { TupleCodec } from '../../../codec/TupleCodec'
import { SchemaAny } from '../../../schema/alias/SchemaAny'
import { TupleSchemaType } from '../../../schema/alias/TupleSchemaType'
import { TupleSchema } from '../../../schema/TupleSchema'
import { CodecResolverFallback } from './CodecResolverFallback'

export function tupleResolver<S extends SchemaAny>(
  schema: TupleSchema<TupleSchemaType>,
  fallback: CodecResolverFallback
): CodecAny<S> {
  return new TupleCodec(
    schema.items.map((s) => fallback(s)) as TupleCodecType
  ) as unknown as CodecAny<S>
}
