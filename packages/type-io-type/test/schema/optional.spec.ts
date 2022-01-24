import { expect } from 'chai'
import { OptionalSchema, StringSchema } from '../../src'
import * as t from './util'

describe('Schema: OptionalSchema', () => {
  const schema = OptionalSchema.create(StringSchema.create())

  it('Name compare', () => {
    const comparator = OptionalSchema.create(StringSchema.create())
    expect(schema.name).to.be.equal(comparator.name)
  })

  t.testArray(schema).invalid()
  t.testBoolean(schema).invalid()
  t.testLiteralString(schema).valid()
  t.testLiteralNumber(schema).invalid()
  t.testLiteralBoolean(schema).invalid()
  t.testNull(schema).invalid()
  t.testNumber(schema).invalid()
  t.testObject(schema).invalid()
  t.testDeepObject(schema).invalid()
  t.testString(schema).valid()
  t.testUndefined(schema).valid()
})
