import { expect } from 'chai'
import { UndefinedSchema } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: UndefinedSchema', () => {
  const schema = UndefinedSchema.create()

  it('Name compare', () => {
    const comparator = UndefinedSchema.create()
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
    suite.object.simple.isFalse()
    suite.object.nested.isFalse()
    suite.string.isFalse()
    suite.tuple.isFalse()
    suite.type.isFalse()
    suite.undefined.isTrue()
  })
})
