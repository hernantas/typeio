import { expect } from 'chai'
import { TypeSchema, Property, StringSchema } from '../../src'
import { getMetadata } from '../../src/decorator/metadata'

class MyClass {
  @Property()
  _string: string = ''

  @Property(StringSchema.create())
  _defined: string = ''
}

describe('Decorator: @Property', () => {
  const schemas = getMetadata(MyClass)

  it('Define property (default)', () => {
    expect(schemas._string).to.be.instanceOf(TypeSchema)
  })

  it('Define property (defined)', () => {
    expect(schemas._defined).to.be.instanceOf(StringSchema)
  })
})
