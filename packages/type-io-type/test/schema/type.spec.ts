import { expect } from 'chai'
import { type } from '../../src'
import { User } from '../util/cases'
import { createSuite } from '../util/createSuite'

describe('Schema: TypeSchema', () => {
  const schema = type(User)

  it('Name compare', () => {
    const comparator = type(User)
    expect(schema.name).to.be.equal(comparator.name)
  })

  describe('Type check', () => {
    const suite = createSuite((v) => schema.is(v))
    suite.array.string.isFalse()
    suite.boolean.isFalse()
    suite.literal.boolean.isFalse()
    suite.literal.number.isFalse()
    suite.literal.string.isFalse()
    suite.null.isFalse()
    suite.number.isFalse()
    suite.object.simple.isFalse()
    suite.object.nested.isFalse()
    suite.string.isFalse()
    suite.tuple.isFalse()
    suite.type.isTrue()
    suite.undefined.isFalse()
  })
})
