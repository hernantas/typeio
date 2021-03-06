import { expect } from 'chai'
import { nullable, string } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: NullSchema', () => {
  const schema = nullable(string())

  it('Name compare', () => {
    const comparator = nullable(string())
    expect(schema.name).to.be.equal(comparator.name)
  })

  describe('Type check', () => {
    const suite = createSuite((v) => schema.is(v))
    suite.array.string.isFalse()
    suite.boolean.isFalse()
    suite.date.isFalse()
    suite.literal.boolean.isFalse()
    suite.literal.number.isFalse()
    suite.literal.string.isTrue()
    suite.null.isTrue()
    suite.number.isFalse()
    suite.object.simple.isFalse()
    suite.object.nested.isFalse()
    suite.string.isTrue()
    suite.tuple.isFalse()
    suite.type.isFalse()
    suite.undefined.isFalse()
  })

  describe('Validation', () => {
    it('Inner type', () => {
      const validator = nullable(string().notEmpty())
      expect(validator.validate('string')).to.have.length(0)
      expect(validator.validate('')).to.have.length.greaterThan(0)
      expect(validator.validate(null)).to.have.length(0)
    })
  })
})
