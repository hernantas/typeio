import { expect } from 'chai'
import { BooleanSchema, NumberSchema, StringSchema, TupleSchema } from '../../src'
import * as t from './shared'

describe('Schema: TupleSchema', () => {
  const schema = TupleSchema.create([
    StringSchema.create(),
    StringSchema.create(),
    NumberSchema.create(),
    NumberSchema.create(),
    BooleanSchema.create(),
    BooleanSchema.create()
  ])

  it('Name compare', () => {
    const comparator = TupleSchema.create([
      StringSchema.create(),
      StringSchema.create(),
      NumberSchema.create(),
      NumberSchema.create(),
      BooleanSchema.create(),
      BooleanSchema.create()
    ])
    expect(schema.name).to.be.equal(comparator.name)
  })

  // t.testArray(schema).invalid()
  t.testBoolean(schema).invalid()
  t.testLiteralString(schema).invalid()
  t.testLiteralNumber(schema).invalid()
  t.testLiteralBoolean(schema).invalid()
  t.testNull(schema).invalid()
  t.testNumber(schema).invalid()
  t.testObject(schema).invalid()
  t.testDeepObject(schema).invalid()
  t.testString(schema).invalid()
  t.testTuple(schema).valid()
  t.testUndefined(schema).invalid()
})
