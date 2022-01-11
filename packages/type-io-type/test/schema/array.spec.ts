import { ArraySchema, StringSchema } from '../../src'
import { testArray, testBoolean, testLiteralBoolean, testLiteralNumber, testLiteralString, testNull, testNumber, testString, testUndefined } from './shared'

describe('Schema: ArraySchema', () => {
  const schema = ArraySchema.create(StringSchema.create())

  testArray(schema).valid()
  testBoolean(schema).invalid()
  testLiteralString(schema).invalid()
  testLiteralNumber(schema).invalid()
  testLiteralBoolean(schema).invalid()
  testNull(schema).invalid()
  testNumber(schema).invalid()
  testString(schema).invalid()
  testUndefined(schema).invalid()
})
