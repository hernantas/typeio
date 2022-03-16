import { CodecAny } from '../../codec/alias/CodecAny'
import { ArrayCodec } from '../../codec/ArrayCodec'
import { SchemaAny } from '../../schema/alias/SchemaAny'
import { ArraySchema } from '../../schema/ArraySchema'
import { CodecResolver } from './CodecResolver'
import { CodecResolverFallback } from './CodecResolverFallback'

export class ArrayResolver implements CodecResolver<ArraySchema<SchemaAny>> {
  is(schema: SchemaAny): schema is ArraySchema<SchemaAny> {
    return ArraySchema.is(schema)
  }

  resolve(
    schema: ArraySchema<SchemaAny>,
    fallback: CodecResolverFallback
  ): CodecAny<ArraySchema<SchemaAny>> {
    return new ArrayCodec(fallback(schema.type))
  }
}
