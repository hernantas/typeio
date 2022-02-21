import { CodecAny } from '../../../codec/alias/CodecAny'
import { CodecMap } from '../../../codec/helper/CodecMap'
import { TypeCodec } from '../../../codec/TypeCodec'
import { SchemaAny } from '../../../schema/alias/SchemaAny'
import { TypeSchema } from '../../../schema/TypeSchema'
import { CodecResolverFallback } from './CodecResolverFallback'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function typeResolver<S extends TypeSchema<any>>(
  schema: S,
  fallback: CodecResolverFallback
): CodecAny<S> {
  return new TypeCodec(
    schema.type,
    Object.keys(schema.properties).reduce(
      (prev, key) => ({
        ...prev,
        [key]: fallback(schema.properties[key] as SchemaAny),
      }),
      {} as CodecMap<unknown>
    )
  ) as unknown as CodecAny<S>
}
