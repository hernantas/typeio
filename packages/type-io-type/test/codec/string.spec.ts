import { StringCodec } from '../../src'
import { testValues } from '../util/testValues'
import { createDecodeTest } from './util'

describe('Codec', () => {
  describe('StringCodec', () => {
    const codec = new StringCodec()

    describe('Decode', () => {
      createDecodeTest('From array', codec, testValues.array.string, testValues.array.string.map(String)).valid()
      createDecodeTest('From tuple', codec, testValues.tuple, testValues.tuple.map(String)).valid()
      createDecodeTest('From literal (string)', codec, testValues.literal.string).valid()
      createDecodeTest('From literal (number)', codec, testValues.literal.number, testValues.literal.number.map(String)).valid()
      createDecodeTest('From literal (boolean)', codec, testValues.literal.boolean, testValues.literal.boolean.map(String)).valid()
      createDecodeTest('From object (simple)', codec, testValues.object.simple, testValues.object.simple.map(String)).valid()
      createDecodeTest('From object (nested)', codec, testValues.object.nested, testValues.object.nested.map(String)).valid()
      createDecodeTest('From boolean', codec, testValues.boolean, ['true', 'false']).valid()
      createDecodeTest('From number', codec, testValues.number, ['0', '80', '8080']).valid()
      createDecodeTest('From string', codec, testValues.string).valid()
      createDecodeTest('From null', codec, testValues.null, ['null']).valid()
      createDecodeTest('From undefined', codec, testValues.undefined, ['undefined']).valid()
    })
  })
})
