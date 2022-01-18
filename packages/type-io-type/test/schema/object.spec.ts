import { expect } from 'chai'
import { BooleanSchema, NumberSchema, ObjectSchema, StringSchema } from '../../src'
import * as t from './shared'

describe('Schema: ObjectSchema', () => {
  const base = ObjectSchema.create({
    _string: StringSchema.create(),
    _number: NumberSchema.create(),
    _boolean: BooleanSchema.create()
  })

  const schema = ObjectSchema.create({
    _string: StringSchema.create(),
    _number: NumberSchema.create(),
    _boolean: BooleanSchema.create(),
    _nested: base
  })

  it('Name compare', () => {
    expect(base.name).to.be.not.equal(schema.name)
    expect(base.name).to.be.equal(schema.properties._nested.name)
  })

  describe('Simple Object Schema', () => {
    t.testArray(base).invalid()
    t.testBoolean(base).invalid()
    t.testLiteralString(base).invalid()
    t.testLiteralNumber(base).invalid()
    t.testLiteralBoolean(base).invalid()
    t.testNull(base).invalid()
    t.testNumber(base).invalid()
    t.testObject(base).valid()
    // t.testDeepObject(base).invalid()
    t.testString(base).invalid()
    t.testUndefined(base).invalid()
  })

  describe('Nested Object Schema', () => {
    t.testArray(schema).invalid()
    t.testBoolean(schema).invalid()
    t.testLiteralString(schema).invalid()
    t.testLiteralNumber(schema).invalid()
    t.testLiteralBoolean(schema).invalid()
    t.testNull(schema).invalid()
    t.testNumber(schema).invalid()
    t.testObject(schema).invalid()
    t.testDeepObject(schema).valid()
    t.testString(schema).invalid()
    t.testUndefined(schema).invalid()
  })
})
