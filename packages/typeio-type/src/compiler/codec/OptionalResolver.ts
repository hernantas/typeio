import { CodecAny } from '../../codec/alias/CodecAny'
import { OptionalCodec } from '../../codec/OptionalCodec'
import { SchemaAny } from '../../schema/alias/SchemaAny'
import { OptionalSchema } from '../../schema/OptionalSchema'
import { CodecResolver } from './CodecResolver'
import { CodecResolverFallback } from './CodecResolverFallback'

export class OptionalResolver
  implements CodecResolver<OptionalSchema<SchemaAny>>
{
  is(schema: SchemaAny): schema is OptionalSchema<SchemaAny> {
    return OptionalSchema.isInstance(schema)
  }

  resolve(
    schema: OptionalSchema<SchemaAny>,
    fallback: CodecResolverFallback
  ): CodecAny<OptionalSchema<SchemaAny>> {
    return new OptionalCodec(fallback(schema.type))
  }
}
