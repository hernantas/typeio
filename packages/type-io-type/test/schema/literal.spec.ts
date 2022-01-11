import { LiteralSchema } from '../../src'
import * as t from './shared'

describe('Schema: LiteralSchema', () => {
  const schema = LiteralSchema.create('literal')

  t.testArray(schema).invalid()
  t.testBoolean(schema).invalid()
  t.testLiteralString(schema).valid()
  t.testLiteralNumber(schema).invalid()
  t.testLiteralBoolean(schema).invalid()
  t.testNull(schema).invalid()
  t.testNumber(schema).invalid()
  t.testString(schema).invalid()
  t.testUndefined(schema).invalid()
})
