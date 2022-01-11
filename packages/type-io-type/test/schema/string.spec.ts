import { StringSchema } from '../../src'
import { testArray, testBoolean, testLiteralBoolean, testLiteralNumber, testLiteralString, testNull, testNumber, testString, testUndefined } from './shared'

describe('Schema: StringSchema', () => {
  const schema = StringSchema.create()

  testArray(schema).invalid()
  testBoolean(schema).invalid()
  testLiteralString(schema).valid()
  testLiteralNumber(schema).invalid()
  testLiteralBoolean(schema).invalid()
  testNull(schema).invalid()
  testNumber(schema).invalid()
  testString(schema).valid()
  testUndefined(schema).invalid()
})
