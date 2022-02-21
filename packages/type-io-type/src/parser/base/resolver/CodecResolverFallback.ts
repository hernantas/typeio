import { CodecAny } from '../../../codec/alias/CodecAny'
import { SchemaAny } from '../../../schema/alias/SchemaAny'

export interface CodecResolverFallback {
  <S extends SchemaAny>(schema: S): CodecAny<S>
}
