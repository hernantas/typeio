import { expect } from 'chai'
import { date } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: DateSchema', () => {
  const schema = date()

  it('Name compare', () => {
    const comparator = date()
    expect(schema.name).to.be.equal(comparator.name)
  })

  describe('Type check', () => {
    const suite = createSuite((v) => schema.is(v))
    suite.array.string.isFalse()
    suite.boolean.isFalse()
    suite.date.isTrue()
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
    const before = new Date(2022, 2, 1)
    const now = new Date(2022, 2, 2)
    const after = new Date(2022, 2, 3)

    it('Min', () => {
      const validator = schema.min(now)
      expect(validator.validate(before)).to.have.length.greaterThan(0)
      expect(validator.validate(now)).to.have.length(0)
      expect(validator.validate(after)).to.have.length(0)
    })

    it('Max', () => {
      const validator = schema.max(now)
      expect(validator.validate(before)).to.have.length(0)
      expect(validator.validate(now)).to.have.length(0)
      expect(validator.validate(after)).to.have.length.greaterThan(0)
    })

    it('Greater', () => {
      const validator = schema.greater(now)
      expect(validator.validate(before)).to.have.length.greaterThan(0)
      expect(validator.validate(now)).to.have.length.greaterThan(0)
      expect(validator.validate(after)).to.have.length(0)
    })

    it('Less', () => {
      const validator = schema.less(now)
      expect(validator.validate(before)).to.have.length(0)
      expect(validator.validate(now)).to.have.length.greaterThan(0)
      expect(validator.validate(after)).to.have.length.greaterThan(0)
    })
  })
})
