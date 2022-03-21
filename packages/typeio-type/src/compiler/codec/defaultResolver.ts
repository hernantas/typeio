import { CodecAny } from '../../codec/alias/CodecAny'
import { DefaultCodec } from '../../codec/DefaultCodec'
import { SchemaAny } from '../../schema/alias/SchemaAny'

export function defaultResolver(schema: SchemaAny): CodecAny<SchemaAny> {
  return new DefaultCodec(schema)
}
