import { expect } from 'chai'
import {
  BooleanSchema,
  NumberSchema,
  StringSchema,
  UnionSchema,
} from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: UnionSchema', () => {
  const schema = UnionSchema.create([
    StringSchema.create(),
    NumberSchema.create(),
    BooleanSchema.create(),
  ])

  it('Name compare', () => {
    const comparator = UnionSchema.create([
      StringSchema.create(),
      NumberSchema.create(),
      BooleanSchema.create(),
    ])
    expect(schema.name).to.be.equal(comparator.name)
  })

  const suite = createSuite('Type check', (v) => schema.is(v))
  suite.array.string.isFalse()
  suite.boolean.isTrue()
  suite.literal.boolean.isTrue()
  suite.literal.number.isTrue()
  suite.literal.string.isTrue()
  suite.null.isFalse()
  suite.number.isTrue()
  suite.object.simple.isFalse()
  suite.object.nested.isFalse()
  suite.string.isTrue()
  suite.tuple.isFalse()
  suite.type.isFalse()
  suite.undefined.isFalse()

  describe('Validation', () => {
    it('Inner type', () => {
      const validator = UnionSchema.create([
        StringSchema.create().notEmpty(),
        NumberSchema.create().greater(0),
      ])
      expect(validator.validate('string')).to.have.length(0)
      expect(validator.validate('')).to.have.length.greaterThan(0)
      expect(validator.validate(80)).to.have.length(0)
      expect(validator.validate(0)).to.have.length.greaterThan(0)
    })
  })
})
