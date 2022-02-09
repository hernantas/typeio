import { SchemaAny } from '../../schema/alias/SchemaAny'
import { Codec } from '../interface/Codec'

export type CodecAny<T extends SchemaAny = SchemaAny> = Codec<
  T,
  unknown,
  unknown
>
