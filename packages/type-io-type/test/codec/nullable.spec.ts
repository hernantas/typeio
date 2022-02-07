import { NullableCodec, StringCodec } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Codec', () => {
  describe('NullableCodec', () => {
    const codec = new NullableCodec(new StringCodec())

    describe('Decode', () => {
      const suite = createSuite('From', (v) => codec.decode(v))
      suite.array.string.each((c) => c.is(c.value.join()))
      suite.boolean.each((c) => c.is(c.value ? 'true' : 'false'))
      suite.literal.boolean.is('true')
      suite.literal.number.is('0')
      suite.literal.string.isEqual()
      suite.null.is(null)
      suite.number.each((c) => c.is(c.value.toString()))
      suite.object.simple.is(String({ foo: 'bar' }))
      suite.object.nested.is(String({ foo: 'bar' }))
      suite.string.isEqual()
      suite.tuple.each((c) => c.is(c.value.join()))
      suite.type.is(String({ foo: 'bar' }))
      suite.undefined.is('undefined')
    })
  })
})
