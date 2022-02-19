import { expect } from 'chai'
import {
  BooleanSchema,
  IntersectSchema,
  NumberSchema,
  ObjectSchema,
  StringSchema,
} from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: IntersectSchema', () => {
  {
    const schema = IntersectSchema.create([
      ObjectSchema.create({ _string: StringSchema.create() }),
      ObjectSchema.create({ _number: NumberSchema.create() }),
      ObjectSchema.create({ _boolean: BooleanSchema.create() }),
    ])

    it('Name compare', () => {
      const comparator = IntersectSchema.create([
        ObjectSchema.create({ _string: StringSchema.create() }),
        ObjectSchema.create({ _number: NumberSchema.create() }),
        ObjectSchema.create({ _boolean: BooleanSchema.create() }),
      ])
      expect(schema.name).to.be.equal(comparator.name)
    })

    describe('Type check', () => {
      const suite = createSuite((v) => schema.is(v))
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
  }

  describe('Type check (never)', () => {
    const schema = IntersectSchema.create([
      StringSchema.create(),
      NumberSchema.create(),
      BooleanSchema.create(),
    ])
    const suite = createSuite((v) => schema.is(v))
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
    suite.tuple.isFalse()
    suite.type.isFalse()
    suite.undefined.isFalse()
  })
})
