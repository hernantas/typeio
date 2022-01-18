import { expect } from 'chai'
import { LiteralSchema } from '../../src'
import * as t from './shared'

describe('Schema: LiteralSchema', () => {
  it('Name compare', () => {
    const stringLiteral = LiteralSchema.create('literal')
    const numberLiteral = LiteralSchema.create(0)
    const booleanLiteral = LiteralSchema.create(true)

    expect(stringLiteral.name).to.be.not.equal(numberLiteral.name)
    expect(stringLiteral.name).to.be.not.equal(booleanLiteral.name)
    expect(numberLiteral.name).to.be.not.equal(booleanLiteral.name)
  })

  describe('Literal (string)', () => {
    const schema = LiteralSchema.create('literal')
    t.testArray(schema).invalid()
    t.testBoolean(schema).invalid()
    t.testLiteralString(schema).valid()
    t.testLiteralNumber(schema).invalid()
    t.testLiteralBoolean(schema).invalid()
    t.testNull(schema).invalid()
    t.testNumber(schema).invalid()
    t.testObject(schema).invalid()
    t.testDeepObject(schema).invalid()
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
    t.testObject(schema).invalid()
    t.testDeepObject(schema).invalid()
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
    t.testObject(schema).invalid()
    t.testDeepObject(schema).invalid()
    t.testString(schema).invalid()
    t.testUndefined(schema).invalid()
  })
})
