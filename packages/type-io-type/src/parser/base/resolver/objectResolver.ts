import { CodecAny } from '../../../codec/alias/CodecAny'
import { CodecMap } from '../../../codec/helper/CodecMap'
import { ObjectCodec } from '../../../codec/ObjectCodec'
import { ObjectSchemaType } from '../../../schema/alias/ObjectSchemaType'
import { SchemaAny } from '../../../schema/alias/SchemaAny'
import { ObjectSchema } from '../../../schema/ObjectSchema'
import { CodecResolverFallback } from './CodecResolverFallback'

export function objectResolver<S extends SchemaAny>(
  schema: ObjectSchema<ObjectSchemaType>,
  fallback: CodecResolverFallback
): CodecAny<S> {
  return new ObjectCodec(
    Object.keys(schema.properties).reduce(
      (prev, key) => ({
        ...prev,
        [key]: fallback(schema.properties[key] as SchemaAny),
      }),
      {} as CodecMap<unknown>
    )
  ) as unknown as CodecAny<S>
}