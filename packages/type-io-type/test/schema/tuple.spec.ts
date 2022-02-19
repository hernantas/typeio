import { expect } from 'chai'
import {
  BooleanSchema,
  NumberSchema,
  StringSchema,
  TupleSchema,
} from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: TupleSchema', () => {
  const schema = TupleSchema.create([
    StringSchema.create(),
    StringSchema.create(),
    NumberSchema.create(),
    NumberSchema.create(),
    BooleanSchema.create(),
    BooleanSchema.create(),
  ])

  it('Name compare', () => {
    const comparator = TupleSchema.create([
      StringSchema.create(),
      StringSchema.create(),
      NumberSchema.create(),
      NumberSchema.create(),
      BooleanSchema.create(),
      BooleanSchema.create(),
    ])
    expect(schema.name).to.be.equal(comparator.name)
  })

  const suite = createSuite('Type check', (v) => schema.is(v))
  suite.array.string.isFalse()
  suite.boolean.isFalse()
  suite.literal.boolean.isFalse()
  suite.literal.number.isFalse()
  suite.literal.string.isFalse()
  suite.null.isFalse()
  suite.number.isFalse()
  suite.object.simple.isFalse()
  suite.object.nested.isFalse()
  suite.string.isFalse()
  suite.tuple.isTrue()
  suite.type.isFalse()
  suite.undefined.isFalse()

  describe('Validation', () => {
    it('Inner type', () => {
      const validator = TupleSchema.create([
        StringSchema.create().notEmpty(),
        NumberSchema.create().greater(0),
      ])
      expect(validator.validate(['string', 80])).to.have.length(0)
      expect(validator.validate(['string', 0])).to.have.length.greaterThan(0)
      expect(validator.validate(['', 80])).to.have.length.greaterThan(0)
    })
  })
})
