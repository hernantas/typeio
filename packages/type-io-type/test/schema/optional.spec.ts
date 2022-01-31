import { expect } from 'chai'
import { OptionalSchema, StringSchema } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: OptionalSchema', () => {
  const schema = OptionalSchema.create(StringSchema.create())

  it('Name compare', () => {
    const comparator = OptionalSchema.create(StringSchema.create())
    expect(schema.name).to.be.equal(comparator.name)
  })

  const suite = createSuite('Type check', (v) => schema.is(v))
  suite.array.string.isFalse()
  suite.boolean.isFalse()
  suite.literal.boolean.isFalse()
  suite.literal.number.isFalse()
  suite.literal.string.isTrue()
  suite.null.isFalse()
  suite.number.isFalse()
  suite.object.simple.isFalse()
  suite.object.nested.isFalse()
  suite.string.isTrue()
  suite.tuple.isFalse()
  suite.type.isFalse()
  suite.undefined.isTrue()
})
