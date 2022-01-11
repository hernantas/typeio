import { BooleanSchema, NumberSchema, StringSchema, UnionSchema } from '../../src'
import * as t from './shared'

describe('Schema: UnionSchema', () => {
  const schema = UnionSchema.create([
    StringSchema.create(),
    NumberSchema.create(),
    BooleanSchema.create()
  ])

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