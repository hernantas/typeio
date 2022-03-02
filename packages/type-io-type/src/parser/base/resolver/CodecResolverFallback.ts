import { CodecAny } from '../../../codec/alias/CodecAny'
import { SchemaAny } from '../../../schema/alias/SchemaAny'

export interface CodecResolverFallback {
  (schema: SchemaAny): CodecAny<SchemaAny>
}
