import { expect } from 'chai'
import { array, string } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: ArraySchema', () => {
  const schema = array(string())

  it('Name compare', () => {
    const comparator = array(string())
    expect(schema.name).to.be.equal(comparator.name)
  })

  describe('Type check', () => {
    const suite = createSuite((v) => schema.is(v))
    suite.array.string.isTrue()
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
    suite.undefined.isFalse()
  })

  describe('Validation', () => {
    it('Min', () => {
      const validator = schema.min(3)
      expect(
        validator.validate(['First', 'Second', 'Third', 'Fourth', 'Fifth'])
      ).to.have.length(0)
      expect(
        validator.validate(['First', 'Second', 'Third', 'Fourth'])
      ).to.have.length(0)
      expect(validator.validate(['First', 'Second', 'Third'])).to.have.length(0)
      expect(
        validator.validate(['First', 'Second'])
      ).to.have.length.greaterThan(0)
      expect(validator.validate(['First'])).to.have.length.greaterThan(0)
      expect(validator.validate([])).to.have.length.greaterThan(0)
    })

    it('Max', () => {
      const validator = schema.max(3)
      expect(
        validator.validate(['First', 'Second', 'Third', 'Fourth', 'Fifth'])
      ).to.have.length.greaterThan(0)
      expect(
        validator.validate(['First', 'Second', 'Third', 'Fourth'])
      ).to.have.length.greaterThan(0)
      expect(validator.validate(['First', 'Second', 'Third'])).to.have.length(0)
      expect(validator.validate(['First', 'Second'])).to.have.length(0)
      expect(validator.validate(['First'])).to.have.length(0)
      expect(validator.validate([])).to.have.length(0)
    })

    it('Length', () => {
      const validator = schema.length(3)
      expect(
        validator.validate(['First', 'Second', 'Third', 'Fourth', 'Fifth'])
      ).to.have.length.greaterThan(0)
      expect(
        validator.validate(['First', 'Second', 'Third', 'Fourth'])
      ).to.have.length.greaterThan(0)
      expect(validator.validate(['First', 'Second', 'Third'])).to.have.length(0)
      expect(
        validator.validate(['First', 'Second'])
      ).to.have.length.greaterThan(0)
      expect(validator.validate(['First'])).to.have.length.greaterThan(0)
      expect(validator.validate([])).to.have.length.greaterThan(0)
    })

    it('Inner type', () => {
      const validator = array(array(string().notEmpty()))
      const errors = validator.validate([
        ['First', 'Second', 'Third', 'Fourth', 'Fifth', ''],
      ])
      expect(errors).to.have.length.greaterThan(0)
      expect(errors[0]?.path).to.be.deep.equal(['0', '5'])
    })
  })
})
