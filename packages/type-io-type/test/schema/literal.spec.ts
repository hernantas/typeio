import { LiteralSchema } from '../../src'
import * as t from './shared'

describe('Schema: LiteralSchema', () => {
  describe('Literal (string)', () => {
    const schema = LiteralSchema.create('literal')
    t.testArray(schema).invalid()
    t.testBoolean(schema).invalid()
    t.testLiteralString(schema).valid()
    t.testLiteralNumber(schema).invalid()
    t.testLiteralBoolean(schema).invalid()
    t.testNull(schema).invalid()
    t.testNumber(schema).invalid()
    t.testUndefined(schema).invalid()
  })
  describe('Literal (number)', () => {
    const schema = LiteralSchema.create(0)
    t.testArray(schema).invalid()
    t.testBoolean(schema).invalid()
    t.testLiteralString(schema).invalid()
    t.testLiteralNumber(schema).valid()
    t.testLiteralBoolean(schema).invalid()
    t.testNull(schema).invalid()
    t.testString(schema).invalid()
    t.testUndefined(schema).invalid()
  })
  describe('Literal (boolean)', () => {
    const schema = LiteralSchema.create(true)
    t.testArray(schema).invalid()
    t.testLiteralString(schema).invalid()
    t.testLiteralNumber(schema).invalid()
    t.testLiteralBoolean(schema).valid()
    t.testNull(schema).invalid()
    t.testNumber(schema).invalid()
    t.testString(schema).invalid()
    t.testUndefined(schema).invalid()
  })
})
