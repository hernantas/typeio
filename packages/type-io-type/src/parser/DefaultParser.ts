import { CodecAny } from '../codec/alias/CodecAny'
import { BooleanCodec } from '../codec/BooleanCodec'
import { NumberCodec } from '../codec/NumberCodec'
import { StringCodec } from '../codec/StringCodec'
import { Parser } from './Parser'

export class DefaultParser extends Parser {
  constructor(codecs: CodecAny[] = []) {
    super([new StringCodec(), new NumberCodec(), new BooleanCodec(), ...codecs])
  }
}
