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
  it('Define property (default)', () => {
    const schema = getMetadata(MyClass, '_string')
    expect(schema).to.be.instanceOf(TypeSchema)
  })

  it('Define property (defined)', () => {
    const schema = getMetadata(MyClass, '_defined')
    expect(schema).to.be.instanceOf(StringSchema)
  })
})
