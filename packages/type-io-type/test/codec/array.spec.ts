import { ArrayCodec, StringCodec } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Codec', () => {
  describe('ArrayCodec', () => {
    const codec = new ArrayCodec(new StringCodec())

    describe('Decode', () => {
      const suite = createSuite('From', v => codec.decode(v))
      suite.array.string.isDeepEqual()
      suite.boolean.isThrow()
      suite.literal.boolean.isThrow()
      suite.literal.number.isThrow()
      suite.literal.string.isThrow()
      suite.null.isThrow()
      suite.number.isThrow()
      suite.object.simple.isThrow()
      suite.object.nested.isThrow()
      suite.string.isThrow()
      suite.tuple.each(c => c.isDeep(c.value.map(v => v.toString())))
      suite.undefined.isThrow()
    })
  })
})
