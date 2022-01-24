import { expect } from 'chai'
import { ArraySchema, StringSchema } from '../../src'
import * as t from './util'

describe('Schema: ArraySchema', () => {
  const schema = ArraySchema.create(StringSchema.create())

  it('Name compare', () => {
    const comparator = ArraySchema.create(StringSchema.create())
    expect(schema.name).to.be.equal(comparator.name)
  })

  t.testArray(schema).valid()
  t.testBoolean(schema).invalid()
  t.testLiteralString(schema).invalid()
  t.testLiteralNumber(schema).invalid()
  t.testLiteralBoolean(schema).invalid()
  t.testNull(schema).invalid()
  t.testNumber(schema).invalid()
  t.testObject(schema).invalid()
  t.testDeepObject(schema).invalid()
  t.testString(schema).invalid()
  t.testUndefined(schema).invalid()

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
