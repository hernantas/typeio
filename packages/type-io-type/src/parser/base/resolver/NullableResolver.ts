import { CodecAny } from '../../../codec/alias/CodecAny'
import { NullableCodec } from '../../../codec/NullableCodec'
import { SchemaAny } from '../../../schema/alias/SchemaAny'
import { NullableSchema } from '../../../schema/NullableSchema'
import { CodecResolver } from './CodecResolver'
import { CodecResolverFallback } from './CodecResolverFallback'

export class NullableResolver
  implements CodecResolver<NullableSchema<SchemaAny>>
{
  is(schema: SchemaAny): schema is NullableSchema<SchemaAny> {
    return NullableSchema.is(schema)
  }

  resolve(
    schema: NullableSchema<SchemaAny>,
    fallback: CodecResolverFallback
  ): CodecAny<NullableSchema<SchemaAny>> {
    return new NullableCodec(fallback(schema.type))
  }
}
