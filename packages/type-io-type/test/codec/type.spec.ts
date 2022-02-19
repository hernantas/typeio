import { BooleanCodec, NumberCodec, StringCodec, TypeCodec } from '../../src'
import { User } from '../util/cases'
import { createSuite } from '../util/createSuite'

describe('Codec', () => {
  describe('TypeCodec', () => {
    const codec = new TypeCodec(User, {
      _string: new StringCodec(),
      _number: new NumberCodec(),
      _boolean: new BooleanCodec(),
    })

    describe('Decode', () => {
      const suite = createSuite((v) => codec.decode(v))
      suite.array.string.isThrow()
      suite.boolean.isThrow()
      suite.literal.boolean.isThrow()
      suite.literal.number.isThrow()
      suite.literal.string.isThrow()
      suite.null.isThrow()
      suite.number.isThrow()
      suite.object.simple.each((c) => {
        c.expect().to.have.property('_string', c.value._string)
        c.expect().to.have.property('_number', c.value._number)
        c.expect().to.have.property('_boolean', c.value._boolean)
      })
      suite.object.nested.each((c) => {
        c.expect().to.have.property('_string', c.value._string)
        c.expect().to.have.property('_number', c.value._number)
        c.expect().to.have.property('_boolean', c.value._boolean)
      })
      suite.string.isThrow()
      suite.tuple.isThrow()
      suite.type.isDeepEqual()
      suite.undefined.isThrow()
    })
  })
})
