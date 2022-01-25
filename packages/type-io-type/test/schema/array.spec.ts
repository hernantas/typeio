import { expect } from 'chai'
import { ArraySchema, StringSchema } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: ArraySchema', () => {
  const schema = ArraySchema.create(StringSchema.create())

  it('Name compare', () => {
    const comparator = ArraySchema.create(StringSchema.create())
    expect(schema.name).to.be.equal(comparator.name)
  })

  const suite = createSuite('Type check', v => schema.is(v))
  suite.array.string.isTrue()
  suite.boolean.isFalse()
  suite.literal.boolean.isFalse()
  suite.literal.number.isFalse()
  suite.literal.string.isFalse()
  suite.null.isFalse()
  suite.number.isFalse()
  suite.object.simple.isFalse()
  suite.object.nested.isFalse()
  suite.string.isFalse()
  suite.tuple.isFalse()
  suite.undefined.isFalse()

  it('Validation: Min', () => {
    const validator = schema.min(3)
    expect(validator.validate(['First', 'Second', 'Third', 'Fourth', 'Fifth'])).to.have.length(0)
    expect(validator.validate(['First', 'Second', 'Third', 'Fourth'])).to.have.length(0)
    expect(validator.validate(['First', 'Second', 'Third'])).to.have.length(0)
    expect(validator.validate(['First', 'Second'])).to.have.length.greaterThan(0)
    expect(validator.validate(['First'])).to.have.length.greaterThan(0)
    expect(validator.validate([])).to.have.length.greaterThan(0)
  })

  it('Validation: Max', () => {
    const validator = schema.max(3)
    expect(validator.validate(['First', 'Second', 'Third', 'Fourth', 'Fifth'])).to.have.length.greaterThan(0)
    expect(validator.validate(['First', 'Second', 'Third', 'Fourth'])).to.have.length.greaterThan(0)
    expect(validator.validate(['First', 'Second', 'Third'])).to.have.length(0)
    expect(validator.validate(['First', 'Second'])).to.have.length(0)
    expect(validator.validate(['First'])).to.have.length(0)
    expect(validator.validate([])).to.have.length(0)
  })

  it('Validation: Length', () => {
    const validator = schema.length(3)
    expect(validator.validate(['First', 'Second', 'Third', 'Fourth', 'Fifth'])).to.have.length.greaterThan(0)
    expect(validator.validate(['First', 'Second', 'Third', 'Fourth'])).to.have.length.greaterThan(0)
    expect(validator.validate(['First', 'Second', 'Third'])).to.have.length(0)
    expect(validator.validate(['First', 'Second'])).to.have.length.greaterThan(0)
    expect(validator.validate(['First'])).to.have.length.greaterThan(0)
    expect(validator.validate([])).to.have.length.greaterThan(0)
  })
})
