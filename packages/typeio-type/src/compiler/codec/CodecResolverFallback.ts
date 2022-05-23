import { CodecAny } from '../../codec/alias/CodecAny'
import { SchemaAny } from '../../schema/alias/SchemaAny'
import { ResolverFallback } from '../ResolverFallback'

export interface CodecResolverFallback extends ResolverFallback {
  <S extends SchemaAny>(schema: S): CodecAny<S>
}
