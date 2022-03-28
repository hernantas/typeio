import { expect } from 'chai'
import { _undefined } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: UndefinedSchema', () => {
  const schema = _undefined()

  it('Name compare', () => {
    const comparator = _undefined()
    expect(schema.name).to.be.equal(comparator.name)
  })

  describe('Type check', () => {
    const suite = createSuite((v) => schema.is(v))
    suite.array.string.isFalse()
    suite.boolean.isFalse()
    suite.date.isFalse()
    suite.literal.boolean.isFalse()
    suite.literal.number.isFalse()
    suite.literal.string.isFalse()
    suite.null.isFalse()
    suite.number.isFalse()
    suite.object.simple.isFalse()
    suite.object.nested.isFalse()
    suite.string.isFalse()
    suite.tuple.isFalse()
    suite.type.isFalse()
    suite.undefined.isTrue()
  })
})
