import { NumberCodec } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Codec', () => {
  describe('NumberCodec', () => {
    const codec = new NumberCodec()

    describe('Decode', () => {
      const suite = createSuite('From', (v) => codec.decode(v))
      suite.array.string.each((c) =>
        c.value.length === 0 ? c.is(0) : c.isThrow()
      )
      suite.boolean.each((c) => c.is(c.value ? 1 : 0))
      suite.literal.boolean.each((c) => c.is(c.value ? 1 : 0))
      suite.literal.number.isEqual()
      suite.literal.string.isThrow()
      suite.null.is(0)
      suite.number.isEqual()
      suite.object.simple.isThrow()
      suite.object.nested.isThrow()
      suite.string.each((c) =>
        ['', '0'].includes(c.value) ? c.is(0) : c.isThrow()
      )
      suite.tuple.isThrow()
      suite.type.isThrow()
      suite.undefined.isThrow()
    })
  })
})
