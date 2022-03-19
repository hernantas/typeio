import { expect } from 'chai'
import { bool } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: BooleanSchema', () => {
  const schema = bool()

  it('Name compare', () => {
    const comparator = bool()
    expect(schema.name).to.be.equal(comparator.name)
  })

  describe('Type check', () => {
    const suite = createSuite((v) => schema.is(v))
    suite.array.string.isFalse()
    suite.boolean.isTrue()
    suite.date.isFalse()
    suite.literal.boolean.isTrue()
    suite.literal.number.isFalse()
    suite.literal.string.isFalse()
    suite.null.isFalse()
    suite.number.isFalse()
    suite.object.simple.isFalse()
    suite.object.nested.isFalse()
    suite.string.isFalse()
    suite.tuple.isFalse()
    suite.type.isFalse()
    suite.undefined.isFalse()
  })
})
