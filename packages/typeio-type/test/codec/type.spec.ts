import {
  BooleanCodec,
  NumberCodec,
  Property,
  StringCodec,
  TypeCodec,
} from '../../src'
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
        c.expect().to.be.instanceOf(User)
        c.expect().to.have.property('_string', c.value._string)
        c.expect().to.have.property('_number', c.value._number)
        c.expect().to.have.property('_boolean', c.value._boolean)
      })
      suite.object.nested.each((c) => {
        c.expect().to.be.instanceOf(User)
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

  describe('In/Out Name', () => {
    class UserAlt {
      @Property()
      _string_: string = ''

      @Property()
      _number_: number = 0

      @Property()
      _boolean_: boolean = false

      _hidden?: boolean
    }

    const codec = new TypeCodec(
      UserAlt,
      {
        _string_: new StringCodec(),
        _number_: new NumberCodec(),
        _boolean_: new BooleanCodec(),
      },
      {
        _string_: '_string',
        _number_: '_number',
        _boolean_: '_boolean',
      },
      {
        _string_: '_string',
        _number_: '_number',
        _boolean_: '_boolean',
      }
    )
    const suite = createSuite((v) => codec.decode(v))

    suite.object.simple.each((c) => {
      c.expect().to.be.instanceOf(UserAlt)
      c.expect().to.have.property('_string_', c.value._string)
      c.expect().to.have.property('_number_', c.value._number)
      c.expect().to.have.property('_boolean_', c.value._boolean)
    })
    suite.object.nested.each((c) => {
      c.expect().to.be.instanceOf(UserAlt)
      c.expect().to.have.property('_string_', c.value._string)
      c.expect().to.have.property('_number_', c.value._number)
      c.expect().to.have.property('_boolean_', c.value._boolean)
    })
  })
})
