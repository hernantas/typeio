import { expect } from 'chai'
import { LiteralSchema } from '../../src'
import { createSuite } from '../util/createSuite'

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
    const suite = createSuite('Type check', v => schema.is(v))
    suite.array.string.isFalse()
    suite.boolean.isFalse()
    suite.literal.boolean.isFalse()
    suite.literal.number.isFalse()
    suite.literal.string.isTrue()
    suite.null.isFalse()
    suite.number.isFalse()
    suite.object.simple.isFalse()
    suite.object.nested.isFalse()
    suite.string.isFalse()
    suite.tuple.isFalse()
    suite.type.isFalse()
    suite.undefined.isFalse()
  })
  describe('Literal (number)', () => {
    const schema = LiteralSchema.create(0)
    const suite = createSuite('Type check', v => schema.is(v))
    suite.array.string.isFalse()
    suite.boolean.isFalse()
    suite.literal.boolean.isFalse()
    suite.literal.number.isTrue()
    suite.literal.string.isFalse()
    suite.null.isFalse()
    suite.number.each(c => c.value === 0 ? c.isTrue() : c.isFalse())
    suite.object.simple.isFalse()
    suite.object.nested.isFalse()
    suite.string.isFalse()
    suite.tuple.isFalse()
    suite.undefined.isFalse()
  })
  describe('Literal (boolean)', () => {
    const schema = LiteralSchema.create(true)
    const suite = createSuite('Type check', v => schema.is(v))
    suite.array.string.isFalse()
    suite.boolean.each(c => c.value ? c.isTrue() : c.isFalse())
    suite.literal.boolean.isTrue()
    suite.literal.number.isFalse()
    suite.literal.string.isFalse()
    suite.null.isFalse()
    suite.number.isFalse()
    suite.object.simple.isFalse()
    suite.object.nested.isFalse()
    suite.string.isFalse()
    suite.tuple.isFalse()
    suite.undefined.isFalse()
  })
})
