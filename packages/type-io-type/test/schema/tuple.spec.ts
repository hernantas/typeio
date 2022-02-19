import { expect } from 'chai'
import { boolean, number, string, tuple } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: TupleSchema', () => {
  const schema = tuple([
    string(),
    string(),
    number(),
    number(),
    boolean(),
    boolean(),
  ])

  it('Name compare', () => {
    const comparator = tuple([
      string(),
      string(),
      number(),
      number(),
      boolean(),
      boolean(),
    ])
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
    suite.tuple.isTrue()
    suite.type.isFalse()
    suite.undefined.isFalse()
  })

  describe('Validation', () => {
    it('Inner type', () => {
      const validator = tuple([string().notEmpty(), number().greater(0)])
      expect(validator.validate(['string', 80])).to.have.length(0)
      expect(validator.validate(['string', 0])).to.have.length.greaterThan(0)
      expect(validator.validate(['', 80])).to.have.length.greaterThan(0)
    })
  })
})
