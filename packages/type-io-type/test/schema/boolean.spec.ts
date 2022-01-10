import { expect } from 'chai'
import { BooleanSchema } from '../../src'

describe('Schema: BooleanSchema', () => {
  const schema = BooleanSchema.create()

  it('Parse string', () => {
    expect(() => schema.parse('')).to.throw()
    expect(() => schema.parse('S')).to.throw()
    expect(() => schema.parse('String')).to.throw()
  })

  it('Parse number', () => {
    expect(() => schema.parse(0)).to.throw()
    expect(() => schema.parse(80)).to.throw()
    expect(() => schema.parse(8080)).to.throw()
  })

  it('Parse boolean', () => {
    expect(schema.parse(true)).to.be.equal(true)
    expect(schema.parse(false)).to.be.equal(false)
  })

  it('Parse null', () => {
    expect(() => schema.parse(null)).to.throw()
  })

  it('Parse undefined', () => {
    expect(() => schema.parse(undefined)).to.throw()
  })
})
