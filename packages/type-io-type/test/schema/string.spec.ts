import { expect } from 'chai'
import { StringSchema } from '../../src'

describe('Schema: StringSchema', () => {
  const schema = StringSchema.create()

  it('Parse string', () => {
    expect(schema.parse('')).to.be.equal('')
    expect(schema.parse('S')).to.be.equal('S')
    expect(schema.parse('String')).to.be.equal('String')
  })

  it('Parse number', () => {
    expect(() => schema.parse(0)).to.throw()
    expect(() => schema.parse(80)).to.throw()
    expect(() => schema.parse(8080)).to.throw()
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
