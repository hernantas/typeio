import { LiteralCodec } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Codec', () => {
  describe('LiteralCodec', () => {
    describe('String', () => {
      const codec = new LiteralCodec('literal')

      describe('Decode', () => {
        const suite = createSuite((v) => codec.decode(v))
        suite.array.string.isThrow()
        suite.boolean.isThrow()
        suite.literal.boolean.isThrow()
        suite.literal.number.isThrow()
        suite.literal.string.isEqual()
        suite.null.isThrow()
        suite.number.isThrow()
        suite.object.simple.isThrow()
        suite.object.nested.isThrow()
        suite.string.isThrow()
        suite.tuple.isThrow()
        suite.type.isThrow()
        suite.undefined.isThrow()
      })
    })

    describe('Number', () => {
      const codec = new LiteralCodec(0)

      describe('Decode', () => {
        const suite = createSuite((v) => codec.decode(v))
        suite.array.string.each((c) =>
          c.value.length === 0 ? c.is(0) : c.isThrow()
        )
        suite.boolean.each((c) => (c.value ? c.isThrow() : c.is(0)))
        suite.literal.boolean.isThrow()
        suite.literal.number.isEqual()
        suite.literal.string.isThrow()
        suite.null.is(0)
        suite.number.each((c) => (c.value === 0 ? c.is(0) : c.isThrow()))
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

    describe('Boolean', () => {
      const codec = new LiteralCodec(true)

      describe('Decode', () => {
        const suite = createSuite((v) => codec.decode(v))
        suite.array.string.isTrue()
        suite.boolean.each((c) => (c.value ? c.isTrue() : c.isThrow()))
        suite.literal.boolean.isTrue()
        suite.literal.number.isThrow()
        suite.literal.string.isTrue()
        suite.null.isThrow()
        suite.number.each((c) => (c.value > 0 ? c.isTrue() : c.isThrow()))
        suite.object.simple.isTrue()
        suite.object.nested.isTrue()
        suite.string.each((c) =>
          c.value && c.value !== 'false' ? c.isTrue() : c.isThrow()
        )
        suite.tuple.isTrue()
        suite.type.isTrue()
        suite.undefined.isThrow()
      })
    })
  })
})
