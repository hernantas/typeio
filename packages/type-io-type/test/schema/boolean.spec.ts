import { BooleanSchema } from '../../src'
import * as t from './shared'

describe('Schema: BooleanSchema', () => {
  const schema = BooleanSchema.create()

  t.testArray(schema).invalid()
  t.testBoolean(schema).valid()
  t.testLiteralString(schema).invalid()
  t.testLiteralNumber(schema).invalid()
  t.testLiteralBoolean(schema).valid()
  t.testNull(schema).invalid()
  t.testNumber(schema).invalid()
  t.testObject(schema).invalid()
  t.testDeepObject(schema).invalid()
  t.testString(schema).invalid()
  t.testUndefined(schema).invalid()
})
