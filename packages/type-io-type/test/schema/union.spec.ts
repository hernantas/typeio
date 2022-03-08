import { expect } from 'chai'
import { boolean, number, string, union } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: UnionSchema', () => {
  const schema = union(string(), number(), boolean())

  it('Name compare', () => {
    const comparator = union(string(), number(), boolean())
    expect(schema.name).to.be.equal(comparator.name)
  })

  describe('Type check', () => {
    const suite = createSuite((v) => schema.is(v))
    suite.array.string.isFalse()
    suite.boolean.isTrue()
    suite.literal.boolean.isTrue()
    suite.literal.number.isTrue()
    suite.literal.string.isTrue()
    suite.null.isFalse()
    suite.number.isTrue()
    suite.object.simple.isFalse()
    suite.object.nested.isFalse()
    suite.string.isTrue()
    suite.tuple.isFalse()
    suite.type.isFalse()
    suite.undefined.isFalse()
  })

  describe('Validation', () => {
    it('Inner type', () => {
      const validator = union(string().notEmpty(), number().greater(0))
      expect(validator.validate('string')).to.have.length(0)
      expect(validator.validate('')).to.have.length.greaterThan(0)
      expect(validator.validate(80)).to.have.length(0)
      expect(validator.validate(0)).to.have.length.greaterThan(0)
    })
  })
})
