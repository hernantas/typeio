import { expect } from 'chai'
import { boolean, intersect, number, object, string } from '../../src'
import { createSuite } from '../util/createSuite'

describe('Schema: IntersectSchema', () => {
  {
    const schema = intersect([
      object({ _string: string() }),
      object({ _number: number() }),
      object({ _boolean: boolean() }),
    ])

    it('Name compare', () => {
      const comparator = intersect([
        object({ _string: string() }),
        object({ _number: number() }),
        object({ _boolean: boolean() }),
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
    const schema = intersect([string(), number(), boolean()])
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

  describe('Validation', () => {
    it('Inner type', () => {
      const validator = intersect([
        object({ _string: string().notEmpty() }),
        object({ _number: number().greater(0) }),
      ])
      expect(
        validator.validate({ _string: 'string', _number: 80 })
      ).to.have.length(0)
      expect(
        validator.validate({ _string: '', _number: 80 })
      ).to.have.length.greaterThan(0)
      expect(
        validator.validate({ _string: 'string', _number: 0 })
      ).to.have.length.greaterThan(0)
      expect(
        validator.validate({ _string: '', _number: 0 })
      ).to.have.length.greaterThan(0)
    })
  })
})
