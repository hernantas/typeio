import { BooleanCodec, NumberCodec, StringCodec, UnionCodec } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Codec', () => {
  describe('UnionCodec', () => {
    describe('StringCodec | NumberCodec', () => {
      const codec = new UnionCodec([new StringCodec(), new NumberCodec()])
      describe('Decode', () => {
        const suite = createSuite('From', (v) => codec.decode(v))
        suite.array.string.each((c) => c.is(c.value.join()))
        suite.boolean.each((c) => c.is(c.value ? 'true' : 'false'))
        suite.literal.boolean.is('true')
        suite.literal.number.is('0')
        suite.literal.string.isEqual()
        suite.null.is('null')
        suite.number.each((c) => c.is(c.value.toString()))
        suite.object.simple.is(String({ foo: 'bar' }))
        suite.object.nested.is(String({ foo: 'bar' }))
        suite.string.isEqual()
        suite.tuple.each((c) => c.is(c.value.join()))
        suite.type.is(String({ foo: 'bar' }))
        suite.undefined.is('undefined')
      })
    })

    describe('NumberCodec | BooleanCodec', () => {
      const codec = new UnionCodec([new NumberCodec(), new BooleanCodec()])
      describe('Decode', () => {
        const suite = createSuite('From', (v) => codec.decode(v))
        suite.array.string.each((c) =>
          c.value.length === 0 ? c.is(0) : c.is(Boolean(c.value))
        )
        suite.boolean.each((c) => c.is(c.value ? 1 : 0))
        suite.literal.boolean.each((c) => c.is(c.value ? 1 : 0))
        suite.literal.number.isEqual()
        suite.literal.string.isTrue()
        suite.null.is(0)
        suite.number.isEqual()
        suite.object.simple.isTrue()
        suite.object.nested.isTrue()
        suite.string.each((c) =>
          ['', '0'].includes(c.value) ? c.is(0) : c.isTrue()
        )
        suite.tuple.isTrue()
        suite.type.isTrue()
        suite.undefined.isFalse()
      })
    })
  })
})
