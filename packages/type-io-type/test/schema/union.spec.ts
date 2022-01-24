import { expect } from 'chai'
import { BooleanSchema, NumberSchema, StringSchema, UnionSchema } from '../../src'
import * as t from './util'

describe('Schema: UnionSchema', () => {
  const schema = UnionSchema.create([
    StringSchema.create(),
    NumberSchema.create(),
    BooleanSchema.create()
  ])

  it('Name compare', () => {
    const comparator = UnionSchema.create([
      StringSchema.create(),
      NumberSchema.create(),
      BooleanSchema.create()
    ])
    expect(schema.name).to.be.equal(comparator.name)
  })

  t.testArray(schema).invalid()
  t.testBoolean(schema).valid()
  t.testLiteralString(schema).valid()
  t.testLiteralNumber(schema).valid()
  t.testLiteralBoolean(schema).valid()
  t.testNull(schema).invalid()
  t.testNumber(schema).valid()
  t.testObject(schema).invalid()
  t.testDeepObject(schema).invalid()
  t.testString(schema).valid()
  t.testUndefined(schema).invalid()
})
