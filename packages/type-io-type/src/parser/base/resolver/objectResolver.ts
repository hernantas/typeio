import { ObjectCodec, ObjectSchema } from '../../..'
import { CodecAny } from '../../../codec/alias/CodecAny'
import { CodecMap } from '../../../codec/helper/CodecMap'
import { ObjectSchemaType } from '../../../schema/alias/ObjectSchemaType'
import { SchemaAny } from '../../../schema/alias/SchemaAny'
import { CodecResolverFallback } from './CodecResolverFallback'

export function objectResolver<S extends ObjectSchema<ObjectSchemaType>>(
  schema: S,
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
