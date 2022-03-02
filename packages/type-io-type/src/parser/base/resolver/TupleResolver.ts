import { CodecAny } from '../../../codec/alias/CodecAny'
import { TupleCodecType } from '../../../codec/alias/TupleCodecType'
import { TupleCodec } from '../../../codec/TupleCodec'
import { SchemaAny } from '../../../schema/alias/SchemaAny'
import { TupleSchemaType } from '../../../schema/alias/TupleSchemaType'
import { TupleSchema } from '../../../schema/TupleSchema'
import { CodecResolver } from './CodecResolver'
import { CodecResolverFallback } from './CodecResolverFallback'

export class TupleResolver
  implements CodecResolver<TupleSchema<TupleSchemaType>>
{
  is(schema: SchemaAny): schema is TupleSchema<TupleSchemaType> {
    return TupleSchema.is(schema)
  }

  resolve(
    schema: TupleSchema<TupleSchemaType>,
    fallback: CodecResolverFallback
  ): CodecAny<TupleSchema<TupleSchemaType>> {
    return new TupleCodec(
      schema.items.map((s) => fallback(s)) as TupleCodecType
    )
  }
}
