import { expect } from 'chai'
import { NumberSchema } from '../../src'

describe('Schema: NumberSchema', () => {
  const schema = NumberSchema.create()

  it('Parse string', () => {
    expect(() => schema.parse('')).to.throw()
    expect(() => schema.parse('S')).to.throw()
    expect(() => schema.parse('String')).to.throw()
  })

  it('Parse number', () => {
    expect(schema.parse(0)).to.be.equal(0)
    expect(schema.parse(80)).to.be.equal(80)
    expect(schema.parse(8080)).to.be.equal(8080)
  })

  it('Parse boolean', () => {
    expect(() => schema.parse(true)).to.throw()
    expect(() => schema.parse(false)).to.throw()
  })

  it('Parse null', () => {
    expect(() => schema.parse(null)).to.throw()
  })

  it('Parse undefined', () => {
    expect(() => schema.parse(undefined)).to.throw()
  })
})
