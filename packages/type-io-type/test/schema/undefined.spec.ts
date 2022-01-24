import { expect } from 'chai'
import { UndefinedSchema } from '../../src'
import * as t from './util'

describe('Schema: UndefinedSchema', () => {
  const schema = UndefinedSchema.create()

  it('Name compare', () => {
    const comparator = UndefinedSchema.create()
    expect(schema.name).to.be.equal(comparator.name)
  })

  t.testArray(schema).invalid()
  t.testBoolean(schema).invalid()
  t.testLiteralString(schema).invalid()
  t.testLiteralNumber(schema).invalid()
  t.testLiteralBoolean(schema).invalid()
  t.testNull(schema).invalid()
  t.testNumber(schema).invalid()
  t.testObject(schema).invalid()
  t.testDeepObject(schema).invalid()
  t.testString(schema).invalid()
  t.testUndefined(schema).valid()
})
