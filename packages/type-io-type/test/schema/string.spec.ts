import { StringSchema } from '../../src'
import * as t from './shared'

describe('Schema: StringSchema', () => {
  const schema = StringSchema.create()

  t.testArray(schema).invalid()
  t.testBoolean(schema).invalid()
  t.testLiteralString(schema).valid()
  t.testLiteralNumber(schema).invalid()
  t.testLiteralBoolean(schema).invalid()
  t.testNull(schema).invalid()
  t.testNumber(schema).invalid()
  t.testString(schema).valid()
  t.testUndefined(schema).invalid()
})
