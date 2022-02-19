import { expect } from 'chai'
import { optional, string } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: OptionalSchema', () => {
  const schema = optional(string())

  it('Name compare', () => {
    const comparator = optional(string())
    expect(schema.name).to.be.equal(comparator.name)
  })

  describe('Type check', () => {
    const suite = createSuite((v) => schema.is(v))
    suite.array.string.isFalse()
    suite.boolean.isFalse()
    suite.literal.boolean.isFalse()
    suite.literal.number.isFalse()
    suite.literal.string.isTrue()
    suite.null.isFalse()
    suite.number.isFalse()
    suite.object.simple.isFalse()
    suite.object.nested.isFalse()
    suite.string.isTrue()
    suite.tuple.isFalse()
    suite.type.isFalse()
    suite.undefined.isTrue()
  })

  describe('Validation', () => {
    it('Inner type', () => {
      const validator = optional(string().notEmpty())
      expect(validator.validate('string')).to.have.length(0)
      expect(validator.validate('')).to.have.length.greaterThan(0)
      expect(validator.validate(undefined)).to.have.length(0)
    })
  })
})
