import { StringCodec } from '../../src'
import { testValues } from '../util/testValues'
import { createDecodeTest, labelCodec } from './util'

describe('Codec', () => {
  describe('StringCodec', () => {
    const codec = new StringCodec()

    describe('Decode', () => {
      createDecodeTest(labelCodec.array, codec, testValues.array.string, testValues.array.string.map(String)).valid()
      createDecodeTest(labelCodec.tuple, codec, testValues.tuple, testValues.tuple.map(String)).valid()
      createDecodeTest(labelCodec.literal.string, codec, testValues.literal.string).valid()
      createDecodeTest(labelCodec.literal.number, codec, testValues.literal.number, testValues.literal.number.map(String)).valid()
      createDecodeTest(labelCodec.literal.boolean, codec, testValues.literal.boolean, testValues.literal.boolean.map(String)).valid()
      createDecodeTest(labelCodec.object.simple, codec, testValues.object.simple, testValues.object.simple.map(String)).valid()
      createDecodeTest(labelCodec.object.nested, codec, testValues.object.nested, testValues.object.nested.map(String)).valid()
      createDecodeTest(labelCodec.boolean, codec, testValues.boolean, ['true', 'false']).valid()
      createDecodeTest(labelCodec.number, codec, testValues.number, ['0', '80', '8080']).valid()
      createDecodeTest(labelCodec.string, codec, testValues.string).valid()
      createDecodeTest(labelCodec.null, codec, testValues.null, ['null']).valid()
      createDecodeTest(labelCodec.undefined, codec, testValues.undefined, ['undefined']).valid()
    })
  })
})
