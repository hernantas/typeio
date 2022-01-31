import { expect } from 'chai'
import {
  BooleanSchema,
  NumberSchema,
  ObjectSchema,
  StringSchema,
} from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: ObjectSchema', () => {
  const base = ObjectSchema.create({
    _string: StringSchema.create(),
    _number: NumberSchema.create(),
    _boolean: BooleanSchema.create(),
  })

  const schema = ObjectSchema.create({
    _string: StringSchema.create(),
    _number: NumberSchema.create(),
    _boolean: BooleanSchema.create(),
    _nested: base,
  })

  it('Name compare', () => {
    expect(base.name).to.be.not.equal(schema.name)
    expect(base.name).to.be.equal(schema.properties._nested.name)
  })

  describe('Simple Object Schema', () => {
    const suite = createSuite('Type check', (v) => base.is(v))
    suite.array.string.isFalse()
    suite.boolean.isFalse()
    suite.literal.boolean.isFalse()
    suite.literal.number.isFalse()
    suite.literal.string.isFalse()
    suite.null.isFalse()
    suite.number.isFalse()
    suite.object.simple.isTrue()
    suite.object.nested.isTrue()
    suite.string.isFalse()
    suite.tuple.isFalse()
    suite.type.isTrue()
    suite.undefined.isFalse()
  })

  describe('Nested Object Schema', () => {
    const suite = createSuite('Type check', (v) => schema.is(v))
    suite.array.string.isFalse()
    suite.boolean.isFalse()
    suite.literal.boolean.isFalse()
    suite.literal.number.isFalse()
    suite.literal.string.isFalse()
    suite.null.isFalse()
    suite.number.isFalse()
    suite.object.simple.isFalse()
    suite.object.nested.isTrue()
    suite.string.isFalse()
    suite.tuple.isFalse()
    suite.type.isFalse()
    suite.undefined.isFalse()
  })
})
