import { OptionalSchema, StringSchema } from '../../src'
import * as t from './shared'

describe('Schema: OptionalSchema', () => {
  const schema = OptionalSchema.create(StringSchema.create())

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
