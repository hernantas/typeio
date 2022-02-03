import {
  BooleanCodec,
  IntersectCodec,
  NumberCodec,
  ObjectCodec,
  StringCodec,
} from '../../src'
import { createSuite } from '../util/createSuite'

describe('Codec', () => {
  describe('IntersectCodec', () => {
    const codec = new IntersectCodec([
      new ObjectCodec({ _string: new StringCodec() }),
      new ObjectCodec({ _number: new NumberCodec() }),
      new ObjectCodec({ _boolean: new BooleanCodec() }),
    ])

    describe('Decode', () => {
      const suite = createSuite('From', (v) => codec.decode(v))
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
      suite.type.each((c) => {
        c.expect().to.have.property('_string', c.value._string)
        c.expect().to.have.property('_number', c.value._number)
        c.expect().to.have.property('_boolean', c.value._boolean)
      })
      suite.undefined.isThrow()
    })

    describe('Encode', () => {
      const suite = createSuite('From', (v) => codec.encode(codec.decode(v)))
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
      suite.type.each((c) => {
        c.expect().to.have.property('_string', c.value._string)
        c.expect().to.have.property('_number', c.value._number)
        c.expect().to.have.property('_boolean', c.value._boolean)
      })
      suite.undefined.isThrow()
    })
  })
})
