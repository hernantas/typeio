import { LiteralType } from '../../alias/LiteralType'
import { CodecAny } from '../../codec/alias/CodecAny'
import { LiteralCodec } from '../../codec/LiteralCodec'
import { SchemaAny } from '../../schema/alias/SchemaAny'
import { LiteralSchema } from '../../schema/LiteralSchema'
import { CodecResolver } from './CodecResolver'

export class LiteralResolver
  implements CodecResolver<LiteralSchema<LiteralType>>
{
  is(schema: SchemaAny): schema is LiteralSchema<LiteralType> {
    return LiteralSchema.is(schema)
  }

  resolve(
    schema: LiteralSchema<LiteralType>
  ): CodecAny<LiteralSchema<LiteralType>> {
    return new LiteralCodec(schema.value)
  }
}
