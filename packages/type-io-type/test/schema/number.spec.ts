import { NumberSchema } from '../../src'
import { testArray, testBoolean, testLiteralBoolean, testLiteralNumber, testLiteralString, testNull, testNumber, testString, testUndefined } from './shared'

describe('Schema: NumberSchema', () => {
  const schema = NumberSchema.create()

  testArray(schema).invalid()
  testBoolean(schema).invalid()
  testLiteralString(schema).invalid()
  testLiteralNumber(schema).valid()
  testLiteralBoolean(schema).invalid()
  testNull(schema).invalid()
  testNumber(schema).valid()
  testString(schema).invalid()
  testUndefined(schema).invalid()
})
