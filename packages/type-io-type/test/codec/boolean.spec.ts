import { BooleanCodec } from '../../src'
import { createSuite } from '../util/createSuite'
import { TestSuiteCase } from '../util/TestSuiteCase'

describe('Codec', () => {
  describe('BooleanCodec', () => {
    const codec = new BooleanCodec()

    describe('Decode', () => {
      const falseValues = [
        false,
        0,
        -0,
        '',
        null,
        undefined,
        NaN
      ]
      const fn = (c: TestSuiteCase<any>): any =>
        falseValues.includes(c.value)
          ? c.isFalse()
          : c.isTrue()

      const suite = createSuite('From', v => codec.decode(v))
      suite.array.string.each(fn)
      suite.boolean.each(fn)
      suite.literal.boolean.each(fn)
      suite.literal.number.each(fn)
      suite.literal.string.each(fn)
      suite.null.each(fn)
      suite.number.each(fn)
      suite.object.simple.each(fn)
      suite.object.nested.each(fn)
      suite.string.each(fn)
      suite.tuple.each(fn)
      suite.undefined.each(fn)
    })
  })
})
