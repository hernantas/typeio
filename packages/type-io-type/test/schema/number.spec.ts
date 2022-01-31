import { expect } from 'chai'
import { NumberSchema } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: NumberSchema', () => {
  const schema = NumberSchema.create()

  it('Name compare', () => {
    const comparator = NumberSchema.create()
    expect(schema.name).to.be.equal(comparator.name)
  })

  const suite = createSuite('Type check', (v) => schema.is(v))
  suite.array.string.isFalse()
  suite.boolean.isFalse()
  suite.literal.boolean.isFalse()
  suite.literal.number.isTrue()
  suite.literal.string.isFalse()
  suite.null.isFalse()
  suite.number.isTrue()
  suite.object.simple.isFalse()
  suite.object.nested.isFalse()
  suite.string.isFalse()
  suite.tuple.isFalse()
  suite.type.isFalse()
  suite.undefined.isFalse()

  it('Validation: Min', () => {
    const validator = schema.min(0)
    expect(validator.validate(0)).to.have.length(0)
    expect(validator.validate(1)).to.have.length(0)
    expect(validator.validate(Number.MAX_SAFE_INTEGER)).to.have.length(0)
    expect(validator.validate(-1)).to.have.length.greaterThan(0)
    expect(
      validator.validate(Number.MIN_SAFE_INTEGER)
    ).to.have.length.greaterThan(0)
  })

  it('Validation: Max', () => {
    const validator = schema.max(0)
    expect(validator.validate(0)).to.have.length(0)
    expect(validator.validate(-1)).to.have.length(0)
    expect(validator.validate(Number.MIN_SAFE_INTEGER)).to.have.length(0)
    expect(validator.validate(1)).to.have.length.greaterThan(0)
    expect(
      validator.validate(Number.MAX_SAFE_INTEGER)
    ).to.have.length.greaterThan(0)
  })

  it('Validation: Greater', () => {
    const validator = schema.greater(0)
    expect(validator.validate(1)).to.have.length(0)
    expect(validator.validate(Number.MAX_SAFE_INTEGER)).to.have.length(0)
    expect(validator.validate(0)).to.have.length.greaterThan(0)
    expect(validator.validate(-1)).to.have.length.greaterThan(0)
    expect(
      validator.validate(Number.MIN_SAFE_INTEGER)
    ).to.have.length.greaterThan(0)
  })

  it('Validation: Less', () => {
    const validator = schema.less(0)
    expect(validator.validate(-1)).to.have.length(0)
    expect(validator.validate(Number.MIN_SAFE_INTEGER)).to.have.length(0)
    expect(validator.validate(0)).to.have.length.greaterThan(0)
    expect(validator.validate(1)).to.have.length.greaterThan(0)
    expect(
      validator.validate(Number.MAX_SAFE_INTEGER)
    ).to.have.length.greaterThan(0)
  })
})
