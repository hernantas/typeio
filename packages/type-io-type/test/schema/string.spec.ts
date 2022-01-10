import { StringSchema } from '../../src'
import { testBoolean, testNull, testNumber, testString, testUndefined } from './shared'

describe('Schema: StringSchema', () => {
  const schema = StringSchema.create()

  testString(schema).valid()
  testNumber(schema).invalid()
  testBoolean(schema).invalid()
  testNull(schema).invalid()
  testUndefined(schema).invalid()
})
