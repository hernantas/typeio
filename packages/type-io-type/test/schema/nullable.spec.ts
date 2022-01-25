import { expect } from 'chai'
import { NullableSchema, StringSchema } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: NullSchema', () => {
  const schema = NullableSchema.create(StringSchema.create())

  it('Name compare', () => {
    const comparator = NullableSchema.create(StringSchema.create())
    expect(schema.name).to.be.equal(comparator.name)
  })

  const suite = createSuite('Type check', v => schema.is(v))
  suite.array.string.isFalse()
  suite.boolean.isFalse()
  suite.literal.boolean.isFalse()
  suite.literal.number.isFalse()
  suite.literal.string.isTrue()
  suite.null.isTrue()
  suite.number.isFalse()
  suite.object.simple.isFalse()
  suite.object.nested.isFalse()
  suite.string.isTrue()
  suite.tuple.isFalse()
  suite.undefined.isFalse()
})
