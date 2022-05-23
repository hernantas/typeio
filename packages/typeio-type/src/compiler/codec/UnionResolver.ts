import { CodecAny } from '../../codec/alias/CodecAny'
import { UnionCodecType } from '../../codec/alias/UnionCodecType'
import { UnionCodec } from '../../codec/UnionCodec'
import { SchemaAny } from '../../schema/alias/SchemaAny'
import { UnionSchemaType } from '../../schema/alias/UnionSchemaType'
import { UnionSchema } from '../../schema/UnionSchema'
import { CodecResolver } from './CodecResolver'
import { CodecResolverFallback } from './CodecResolverFallback'

export class UnionResolver
  implements CodecResolver<UnionSchema<UnionSchemaType>>
{
  is(schema: SchemaAny): schema is UnionSchema<UnionSchemaType> {
    return UnionSchema.isInstance(schema)
  }

  resolve(
    schema: UnionSchema<UnionSchemaType>,
    fallback: CodecResolverFallback
  ): CodecAny<UnionSchema<UnionSchemaType>> {
    return new UnionCodec(
      schema.items.map((s) => fallback(s)) as UnionCodecType
    )
  }
}
