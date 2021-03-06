import { expect } from 'chai'
import { string } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: StringSchema', () => {
  const schema = string()

  it('Name compare', () => {
    const comparator = string()
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
    suite.null.isFalse()
    suite.number.isFalse()
    suite.object.simple.isFalse()
    suite.object.nested.isFalse()
    suite.string.isTrue()
    suite.tuple.isFalse()
    suite.type.isFalse()
    suite.undefined.isFalse()
  })

  describe('Validation', () => {
    it('Min', () => {
      const validator = schema.min(3)
      expect(validator.validate('username')).to.have.length(0)
      expect(validator.validate('usernam')).to.have.length(0)
      expect(validator.validate('userna')).to.have.length(0)
      expect(validator.validate('usern')).to.have.length(0)
      expect(validator.validate('user')).to.have.length(0)
      expect(validator.validate('use')).to.have.length(0)
      expect(validator.validate('us')).to.have.length.greaterThan(0)
      expect(validator.validate('u')).to.have.length.greaterThan(0)
      expect(validator.validate('')).to.have.length.greaterThan(0)
    })

    it('Max', () => {
      const validator = schema.max(3)
      expect(validator.validate('username')).to.have.length.greaterThan(0)
      expect(validator.validate('usernam')).to.have.length.greaterThan(0)
      expect(validator.validate('userna')).to.have.length.greaterThan(0)
      expect(validator.validate('usern')).to.have.length.greaterThan(0)
      expect(validator.validate('user')).to.have.length.greaterThan(0)
      expect(validator.validate('use')).to.have.length(0)
      expect(validator.validate('us')).to.have.length(0)
      expect(validator.validate('u')).to.have.length(0)
      expect(validator.validate('')).to.have.length(0)
    })

    it('Length', () => {
      const validator = schema.length(3)
      expect(validator.validate('username')).to.have.length.greaterThan(0)
      expect(validator.validate('usernam')).to.have.length.greaterThan(0)
      expect(validator.validate('userna')).to.have.length.greaterThan(0)
      expect(validator.validate('usern')).to.have.length.greaterThan(0)
      expect(validator.validate('user')).to.have.length.greaterThan(0)
      expect(validator.validate('use')).to.have.length(0)
      expect(validator.validate('us')).to.have.length.greaterThan(0)
      expect(validator.validate('u')).to.have.length.greaterThan(0)
      expect(validator.validate('')).to.have.length.greaterThan(0)
    })

    it('Not empty', () => {
      const validator = schema.notEmpty()
      expect(validator.validate('username')).to.have.length(0)
      expect(validator.validate('usernam')).to.have.length(0)
      expect(validator.validate('userna')).to.have.length(0)
      expect(validator.validate('usern')).to.have.length(0)
      expect(validator.validate('user')).to.have.length(0)
      expect(validator.validate('use')).to.have.length(0)
      expect(validator.validate('us')).to.have.length(0)
      expect(validator.validate('u')).to.have.length(0)
      expect(validator.validate('')).to.have.length.greaterThan(0)
    })

    it('Pattern', () => {
      const validator = schema.pattern(/^[a-zA-Z0-9]+$/)
      expect(validator.validate('UserName98543')).to.have.length(0)
      expect(validator.validate('65891238912')).to.have.length(0)
      expect(validator.validate('')).to.have.length.greaterThan(0)
      expect(validator.validate('email@email')).to.have.length.greaterThan(0)
      expect(validator.validate('user_name')).to.have.length.greaterThan(0)
    })

    it('Alphanumeric', () => {
      const validator = schema.alphanumeric()
      expect(validator.validate('UserName98543')).to.have.length(0)
      expect(validator.validate('65891238912')).to.have.length(0)
      expect(validator.validate('')).to.have.length.greaterThan(0)
      expect(validator.validate('email@email')).to.have.length.greaterThan(0)
      expect(validator.validate('user_name')).to.have.length.greaterThan(0)
    })
  })
})
