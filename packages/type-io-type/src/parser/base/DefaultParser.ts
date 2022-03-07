import { ConstructorType } from '../../alias/ConstructorType'
import { CodecAny } from '../../codec/alias/CodecAny'
import { BooleanCodec } from '../../codec/BooleanCodec'
import { NumberCodec } from '../../codec/NumberCodec'
import { StringCodec } from '../../codec/StringCodec'
import { Parser } from './Parser'

export class DefaultParser extends Parser {
  constructor(codecs: ConstructorType<CodecAny>[] = []) {
    super([StringCodec, NumberCodec, BooleanCodec, ...codecs])
  }
}
