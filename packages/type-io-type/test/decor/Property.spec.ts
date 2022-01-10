import { expect } from 'chai'
import { ConstructorSchema, getMetadata, Property, StringSchema } from '../../src'

class MyClass {
  @Property()
  _string: string = ''

  @Property(StringSchema.create())
  _defined: string = ''
}

describe('Decorator: @Property', () => {
  it('Define property (default)', () => {
    const schema = getMetadata(MyClass, '_string')
    expect(schema).to.be.instanceOf(ConstructorSchema)
  })

  it('Define property (defined)', () => {
    const schema = getMetadata(MyClass, '_defined')
    expect(schema).to.be.instanceOf(StringSchema)
  })
})
