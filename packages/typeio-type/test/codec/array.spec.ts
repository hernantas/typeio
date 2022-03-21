import { ArrayCodec, StringCodec } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Codec', () => {
  describe('ArrayCodec', () => {
    const codec = new ArrayCodec(new StringCodec())

    describe('Decode', () => {
      const suite = createSuite((v) => codec.decode(v))
      suite.array.string.isDeepEqual()
      suite.boolean.each((c) => c.isDeep([c.value ? 'true' : 'false']))
      suite.literal.boolean.isDeep(['true'])
      suite.literal.number.isDeep(['0'])
      suite.literal.string.isDeep(['literal'])
      suite.null.isDeep(['null'])
      suite.number.each((c) => c.isDeep([c.value.toString()]))
      suite.object.simple.isDeep([String({ foo: 'bar' })])
      suite.object.nested.isDeep([String({ foo: 'bar' })])
      suite.string.each((c) => c.isDeep([c.value]))
      suite.tuple.each((c) => c.isDeep(c.value.map((v) => v.toString())))
      suite.type.isDeep([String({ foo: 'bar' })])
      suite.undefined.isDeep(['undefined'])
    })
  })
})
