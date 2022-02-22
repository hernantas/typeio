import { LiteralType } from '../../../alias/LiteralType'
import { CodecAny } from '../../../codec/alias/CodecAny'
import { LiteralCodec } from '../../../codec/LiteralCodec'
import { SchemaAny } from '../../../schema/alias/SchemaAny'
import { LiteralSchema } from '../../../schema/LiteralSchema'

export function literalResolver<S extends SchemaAny>(
  schema: LiteralSchema<LiteralType>
): CodecAny<S> {
  return new LiteralCodec(schema.value) as unknown as CodecAny<S>
}
