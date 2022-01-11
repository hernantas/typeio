import { ArraySchema, StringSchema } from '../../src'
import { testArray, testBoolean, testNull, testNumber, testString, testUndefined } from './shared'

describe('Schema: ArraySchema', () => {
  const schema = ArraySchema.create(StringSchema.create())

  testArray(schema).valid()
  testString(schema).invalid()
  testNumber(schema).invalid()
  testBoolean(schema).invalid()
  testNull(schema).invalid()
  testUndefined(schema).invalid()
})
