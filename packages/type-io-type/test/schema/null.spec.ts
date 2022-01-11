import { NullSchema } from '../../src'
import * as t from './shared'

describe('Schema: NullSchema', () => {
  const schema = NullSchema.create()

  t.testArray(schema).invalid()
  t.testBoolean(schema).invalid()
  t.testLiteralString(schema).invalid()
  t.testLiteralNumber(schema).invalid()
  t.testLiteralBoolean(schema).invalid()
  t.testNull(schema).valid()
  t.testNumber(schema).invalid()
  t.testString(schema).invalid()
  t.testUndefined(schema).invalid()
})
