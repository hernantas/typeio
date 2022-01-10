import { BooleanSchema } from '../../src'
import { testBoolean, testNull, testNumber, testString, testUndefined } from './shared'

describe('Schema: BooleanSchema', () => {
  const schema = BooleanSchema.create()

  testString(schema).invalid()
  testNumber(schema).invalid()
  testBoolean(schema).valid()
  testNull(schema).invalid()
  testUndefined(schema).invalid()
})
