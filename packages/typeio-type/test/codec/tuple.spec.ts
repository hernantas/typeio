import { BooleanCodec, NumberCodec, StringCodec, TupleCodec } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Codec', () => {
  describe('TupleCodec', () => {
    const codec = new TupleCodec([
      new StringCodec(),
      new StringCodec(),
      new NumberCodec(),
      new NumberCodec(),
      new BooleanCodec(),
      new BooleanCodec(),
    ])

    describe('Decode', () => {
      const suite = createSuite((v) => codec.decode(v))
      suite.array.string.isThrow()
      suite.boolean.isThrow()
      suite.literal.boolean.isThrow()
      suite.literal.number.isThrow()
      suite.literal.string.isThrow()
      suite.null.isThrow()
      suite.number.isThrow()
      suite.object.simple.isThrow()
      suite.object.nested.isThrow()
      suite.string.isThrow()
      suite.tuple.each((c) => c.isDeep(suite.tuple.cases[0]?.value))
      suite.type.isThrow()
      suite.undefined.isThrow()
    })
  })
})
