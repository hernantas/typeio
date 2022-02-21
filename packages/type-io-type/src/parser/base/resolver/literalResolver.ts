import { LiteralType } from '../../../alias/LiteralType'
import { CodecAny } from '../../../codec/alias/CodecAny'
import { LiteralCodec } from '../../../codec/LiteralCodec'
import { LiteralSchema } from '../../../schema/LiteralSchema'

export function literalResolver<S extends LiteralSchema<LiteralType>>(
  schema: S
): CodecAny<S> {
  return new LiteralCodec(schema.value) as unknown as CodecAny<S>
}
