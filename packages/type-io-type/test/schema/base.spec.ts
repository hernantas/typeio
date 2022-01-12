import { UnknownSchema } from '../../src'
import { expect } from 'chai'

describe('Schema: Base', () => {
  it('Basic declaration', () => {
    const schema = UnknownSchema.create()
    expect(schema.definition.label).to.be.equal(undefined)
  })

  it('Set: label', () => {
    const schema = UnknownSchema.create().label('MyLabel')
    expect(schema.definition.label).to.be.equal('MyLabel')
  })

  it('Override label', () => {
    const schema = UnknownSchema.create().label('MyLabel')
    const overrideSchema = schema.label('MyOverrideLabel')
    expect(schema.definition.label).to.be.equal('MyLabel')
    expect(overrideSchema.definition.label).to.be.equal('MyOverrideLabel')
  })

  it('Empty checks', () => {
    const schema = UnknownSchema.create()
    expect(schema.validate('String')).to.have.length(0)
  })

  it('Validation checks', () => {
    const schema = UnknownSchema.create().addRule(v => typeof v === 'string', 'Type must be a string')
    expect(schema.validate('String')).to.have.length(0)
    expect(schema.validate(0)).to.have.length.greaterThan(0)
    expect(schema.validate(true)).to.have.length.greaterThan(0)
  })

  it('Validation checks override', () => {
    const base = UnknownSchema.create().addRule(v => typeof v === 'string', 'Type must be a string')
    const schema = base.addRule(v => typeof v === 'string' && v.length > 3, 'String must be greater than 3 characters')
    expect(base.validate('S')).to.have.length(0)
    expect(base.validate('String')).to.have.length(0)
    expect(base.validate(0)).to.have.length.greaterThan(0)
    expect(base.validate(true)).to.have.length.greaterThan(0)

    expect(schema.validate('S')).to.have.length.greaterThan(0)
    expect(schema.validate('String')).to.have.length(0)
    expect(schema.validate(0)).to.have.length.greaterThan(0)
    expect(schema.validate(true)).to.have.length.greaterThan(0)
  })
})
