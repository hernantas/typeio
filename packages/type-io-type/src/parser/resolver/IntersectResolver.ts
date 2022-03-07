import { CodecAny } from '../../codec/alias/CodecAny'
import { IntersectCodecType } from '../../codec/alias/IntersectCodecType'
import { IntersectCodec } from '../../codec/IntersectCodec'
import { IntersectSchemaType } from '../../schema/alias/IntersectSchemaType'
import { SchemaAny } from '../../schema/alias/SchemaAny'
import { IntersectSchema } from '../../schema/IntersectSchema'
import { CodecResolver } from './CodecResolver'
import { CodecResolverFallback } from './CodecResolverFallback'

export class IntersectResolver
  implements CodecResolver<IntersectSchema<IntersectSchemaType>>
{
  is(schema: SchemaAny): schema is IntersectSchema<IntersectSchemaType> {
    return IntersectSchema.is(schema)
  }

  resolve(
    schema: IntersectSchema<IntersectSchemaType>,
    fallback: CodecResolverFallback
  ): CodecAny<IntersectSchema<IntersectSchemaType>> {
    return new IntersectCodec(
      schema.items.map((s) => fallback(s)) as IntersectCodecType
    )
  }
}
