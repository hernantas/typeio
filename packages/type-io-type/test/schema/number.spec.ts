import { NumberSchema } from '../../src'
import { testArray, testBoolean, testNull, testNumber, testString, testUndefined } from './shared'

describe('Schema: NumberSchema', () => {
  const schema = NumberSchema.create()

  testArray(schema).invalid()
  testString(schema).invalid()
  testNumber(schema).valid()
  testBoolean(schema).invalid()
  testNull(schema).invalid()
  testUndefined(schema).invalid()
})
