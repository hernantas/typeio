import { BooleanSchema } from '../../src'
import { testArray, testBoolean, testLiteralBoolean, testLiteralNumber, testLiteralString, testNull, testNumber, testString, testUndefined } from './shared'

describe('Schema: BooleanSchema', () => {
  const schema = BooleanSchema.create()

  testArray(schema).invalid()
  testBoolean(schema).valid()
  testLiteralString(schema).invalid()
  testLiteralNumber(schema).invalid()
  testLiteralBoolean(schema).valid()
  testNull(schema).invalid()
  testNumber(schema).invalid()
  testString(schema).invalid()
  testUndefined(schema).invalid()
})
