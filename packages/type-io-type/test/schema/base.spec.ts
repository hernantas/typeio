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
})
