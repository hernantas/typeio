import { TypeOf } from '../..'
import { ConstructorType } from '../../alias/ConstructorType'
import { CodecAny } from '../../codec/alias/CodecAny'
import { BooleanCodec } from '../../codec/BooleanCodec'
import { NumberCodec } from '../../codec/NumberCodec'
import { StringCodec } from '../../codec/StringCodec'
import { SchemaAny } from '../../schema/alias/SchemaAny'
import { Parser } from './Parser'

export class PlainParser extends Parser {
  constructor(codecs: ConstructorType<CodecAny>[] = []) {
    super([StringCodec, NumberCodec, BooleanCodec, ...codecs])
  }

  decodeJson<S extends SchemaAny>(value: string, schema: S): TypeOf<S> {
    return this.decode(JSON.parse(value), schema)
  }

  encodeJson<S extends SchemaAny>(value: TypeOf<S>, schema: S): string {
    return JSON.stringify(this.encode(value, schema))
  }
}
