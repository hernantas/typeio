import { expect } from 'chai'
import { BooleanSchema } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: BooleanSchema', () => {
  const schema = BooleanSchema.create()

  it('Name compare', () => {
    const comparator = BooleanSchema.create()
    expect(schema.name).to.be.equal(comparator.name)
  })

  const suite = createSuite('Type check', v => schema.is(v))
  suite.array.string.isFalse()
  suite.boolean.isTrue()
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
