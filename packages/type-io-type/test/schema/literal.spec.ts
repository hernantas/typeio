import { LiteralSchema } from '../../src'
import { testArray, testBoolean, testLiteralString, testNull, testNumber, testString, testUndefined } from './shared'

describe('Schema: ArraySchema', () => {
  const schema = LiteralSchema.create('literal')

  testArray(schema).invalid()
  testBoolean(schema).invalid()
  testLiteralString(schema).valid()
  testNull(schema).invalid()
  testNumber(schema).invalid()
  testString(schema).invalid()
  testUndefined(schema).invalid()
})
