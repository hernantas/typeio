import { expect } from 'chai'
import { NullSchema } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: NullSchema', () => {
  const schema = NullSchema.create()

  it('Name compare', () => {
    const comparator = NullSchema.create()
    expect(schema.name).to.be.equal(comparator.name)
  })

  const suite = createSuite('Type check', v => schema.is(v))
  suite.array.string.isFalse()
  suite.boolean.isFalse()
  suite.literal.boolean.isFalse()
  suite.literal.number.isFalse()
  suite.literal.string.isFalse()
  suite.null.isTrue()
  suite.number.isFalse()
  suite.object.simple.isFalse()
  suite.object.nested.isFalse()
  suite.string.isFalse()
  suite.tuple.isFalse()
  suite.undefined.isFalse()
})
