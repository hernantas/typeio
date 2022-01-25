import { StringCodec } from '../../src'
import { cases } from '../util/cases'
import { createDecodeTest, labelCodec } from './util'

describe('Codec', () => {
  describe('StringCodec', () => {
    const codec = new StringCodec()

    describe('Decode', () => {
      createDecodeTest(labelCodec.array, codec, cases.array.string, cases.array.string.map(String)).valid()
      createDecodeTest(labelCodec.tuple, codec, cases.tuple, cases.tuple.map(String)).valid()
      createDecodeTest(labelCodec.literal.string, codec, cases.literal.string).valid()
      createDecodeTest(labelCodec.literal.number, codec, cases.literal.number, cases.literal.number.map(String)).valid()
      createDecodeTest(labelCodec.literal.boolean, codec, cases.literal.boolean, cases.literal.boolean.map(String)).valid()
      createDecodeTest(labelCodec.object.simple, codec, cases.object.simple, cases.object.simple.map(String)).valid()
      createDecodeTest(labelCodec.object.nested, codec, cases.object.nested, cases.object.nested.map(String)).valid()
      createDecodeTest(labelCodec.boolean, codec, cases.boolean, ['true', 'false']).valid()
      createDecodeTest(labelCodec.number, codec, cases.number, ['0', '80', '8080']).valid()
      createDecodeTest(labelCodec.string, codec, cases.string).valid()
      createDecodeTest(labelCodec.null, codec, cases.null, ['null']).valid()
      createDecodeTest(labelCodec.undefined, codec, cases.undefined, ['undefined']).valid()
    })
  })
})
