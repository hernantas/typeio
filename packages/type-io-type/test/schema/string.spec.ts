import { StringSchema } from '../../src'
import { testArray, testBoolean, testNull, testNumber, testString, testUndefined } from './shared'

describe('Schema: StringSchema', () => {
  const schema = StringSchema.create()

  testArray(schema).invalid()
  testString(schema).valid()
  testNumber(schema).invalid()
  testBoolean(schema).invalid()
  testNull(schema).invalid()
  testUndefined(schema).invalid()
})
