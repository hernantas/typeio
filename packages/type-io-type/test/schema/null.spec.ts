import { expect } from 'chai'
import { NullSchema } from '../../src'
import * as t from './util'

describe('Schema: NullSchema', () => {
  const schema = NullSchema.create()

  it('Name compare', () => {
    const comparator = NullSchema.create()
    expect(schema.name).to.be.equal(comparator.name)
  })

  t.testArray(schema).invalid()
  t.testBoolean(schema).invalid()
  t.testLiteralString(schema).invalid()
  t.testLiteralNumber(schema).invalid()
  t.testLiteralBoolean(schema).invalid()
  t.testNull(schema).valid()
  t.testNumber(schema).invalid()
  t.testObject(schema).invalid()
  t.testDeepObject(schema).invalid()
  t.testString(schema).invalid()
  t.testUndefined(schema).invalid()
})
