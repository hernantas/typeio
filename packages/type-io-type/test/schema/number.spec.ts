import { NumberSchema } from '../../src'
import { testBoolean, testNull, testNumber, testString, testUndefined } from './shared'

describe('Schema: NumberSchema', () => {
  const schema = NumberSchema.create()

  testString(schema).invalid()
  testNumber(schema).valid()
  testBoolean(schema).invalid()
  testNull(schema).invalid()
  testUndefined(schema).invalid()
})
