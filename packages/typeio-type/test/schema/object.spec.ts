import { expect } from 'chai'
import { boolean, number, object, string } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: ObjectSchema', () => {
  const base = object({
    _string: string(),
    _number: number(),
    _boolean: boolean(),
  })

  const schema = object({
    _string: string(),
    _number: number(),
    _boolean: boolean(),
    _nested: base,
  })

  it('Name compare', () => {
    expect(base.name).to.be.not.equal(schema.name)
    expect(base.name).to.be.equal(schema.properties._nested.name)
  })

  describe('Type check', () => {
    describe('Object (simple)', () => {
      const suite = createSuite((v) => base.is(v))
      suite.array.string.isFalse()
      suite.boolean.isFalse()
      suite.date.isFalse()
      suite.literal.boolean.isFalse()
      suite.literal.number.isFalse()
      suite.literal.string.isFalse()
      suite.null.isFalse()
      suite.number.isFalse()
      suite.object.simple.isTrue()
      suite.object.nested.isTrue()
      suite.string.isFalse()
      suite.tuple.isFalse()
      suite.type.isTrue()
      suite.undefined.isFalse()
    })

    describe('Object (nested)', () => {
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
      suite.object.nested.isTrue()
      suite.string.isFalse()
      suite.tuple.isFalse()
      suite.type.isFalse()
      suite.undefined.isFalse()
    })
  })

  describe('Validation', () => {
    it('Inner type', () => {
      const validator = object({
        _string: string().notEmpty(),
        _number: number().greater(0),
      })
      expect(
        validator.validate({ _string: 'string', _number: 80 })
      ).to.have.length(0)
      expect(
        validator.validate({ _string: 'string', _number: 0 })
      ).to.have.length.greaterThan(0)
      expect(
        validator.validate({ _string: '', _number: 80 })
      ).to.have.length.greaterThan(0)
      expect(
        validator.validate({ _string: '', _number: 0 })
      ).to.have.length.greaterThan(0)
    })
  })
})
