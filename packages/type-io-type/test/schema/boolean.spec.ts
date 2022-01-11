import { BooleanSchema } from '../../src'
import { testArray, testBoolean, testNull, testNumber, testString, testUndefined } from './shared'

describe('Schema: BooleanSchema', () => {
  const schema = BooleanSchema.create()

  testArray(schema).invalid()
  testString(schema).invalid()
  testNumber(schema).invalid()
  testBoolean(schema).valid()
  testNull(schema).invalid()
  testUndefined(schema).invalid()
})
