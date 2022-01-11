import { NullableSchema, StringSchema } from '../../src'
import * as t from './shared'

describe('Schema: NullSchema', () => {
  const schema = NullableSchema.create(StringSchema.create())

  t.testArray(schema).invalid()
  t.testBoolean(schema).invalid()
  t.testLiteralString(schema).valid()
  t.testLiteralNumber(schema).invalid()
  t.testLiteralBoolean(schema).invalid()
  t.testNull(schema).valid()
  t.testNumber(schema).invalid()
  t.testObject(schema).invalid()
  t.testDeepObject(schema).invalid()
  t.testString(schema).valid()
  t.testUndefined(schema).invalid()
})
