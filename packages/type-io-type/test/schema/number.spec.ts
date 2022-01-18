import { expect } from 'chai'
import { NumberSchema } from '../../src'
import * as t from './shared'

describe('Schema: NumberSchema', () => {
  const schema = NumberSchema.create()

  it('Name compare', () => {
    const comparator = NumberSchema.create()
    expect(schema.name).to.be.equal(comparator.name)
  })

  t.testArray(schema).invalid()
  t.testBoolean(schema).invalid()
  t.testLiteralString(schema).invalid()
  t.testLiteralNumber(schema).valid()
  t.testLiteralBoolean(schema).invalid()
  t.testNull(schema).invalid()
  t.testNumber(schema).valid()
  t.testObject(schema).invalid()
  t.testDeepObject(schema).invalid()
  t.testString(schema).invalid()
  t.testUndefined(schema).invalid()

  it('Validation: Min', () => {
    const validator = schema.min(0)
    expect(validator.validate(0)).to.have.length(0)
    expect(validator.validate(1)).to.have.length(0)
    expect(validator.validate(Number.MAX_SAFE_INTEGER)).to.have.length(0)
    expect(validator.validate(-1)).to.have.length.greaterThan(0)
    expect(validator.validate(Number.MIN_SAFE_INTEGER)).to.have.length.greaterThan(0)
  })

  it('Validation: Max', () => {
    const validator = schema.max(0)
    expect(validator.validate(0)).to.have.length(0)
    expect(validator.validate(-1)).to.have.length(0)
    expect(validator.validate(Number.MIN_SAFE_INTEGER)).to.have.length(0)
    expect(validator.validate(1)).to.have.length.greaterThan(0)
    expect(validator.validate(Number.MAX_SAFE_INTEGER)).to.have.length.greaterThan(0)
  })

  it('Validation: Greater', () => {
    const validator = schema.greater(0)
    expect(validator.validate(1)).to.have.length(0)
    expect(validator.validate(Number.MAX_SAFE_INTEGER)).to.have.length(0)
    expect(validator.validate(0)).to.have.length.greaterThan(0)
    expect(validator.validate(-1)).to.have.length.greaterThan(0)
    expect(validator.validate(Number.MIN_SAFE_INTEGER)).to.have.length.greaterThan(0)
  })

  it('Validation: Less', () => {
    const validator = schema.less(0)
    expect(validator.validate(-1)).to.have.length(0)
    expect(validator.validate(Number.MIN_SAFE_INTEGER)).to.have.length(0)
    expect(validator.validate(0)).to.have.length.greaterThan(0)
    expect(validator.validate(1)).to.have.length.greaterThan(0)
    expect(validator.validate(Number.MAX_SAFE_INTEGER)).to.have.length.greaterThan(0)
  })
})
