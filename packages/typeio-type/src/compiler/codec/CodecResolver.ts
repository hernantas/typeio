import { CodecAny } from '../../codec/alias/CodecAny'
import { SchemaAny } from '../../schema/alias/SchemaAny'
import { Resolver } from '../Resolver'

export type CodecResolver<S extends SchemaAny = SchemaAny> = Resolver<
  S,
  CodecAny<S>
>
