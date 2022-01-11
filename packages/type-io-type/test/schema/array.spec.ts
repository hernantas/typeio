import { ArraySchema, StringSchema } from '../../src'
import * as t from './shared'

describe('Schema: ArraySchema', () => {
  const schema = ArraySchema.create(StringSchema.create())

  t.testArray(schema).valid()
  t.testBoolean(schema).invalid()
  t.testLiteralString(schema).invalid()
  t.testLiteralNumber(schema).invalid()
  t.testLiteralBoolean(schema).invalid()
  t.testNull(schema).invalid()
  t.testNumber(schema).invalid()
  t.testString(schema).invalid()
  t.testUndefined(schema).invalid()
})
