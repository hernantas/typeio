import { expect } from 'chai'
import { getDesignType } from '../../src'

function Prop (): PropertyDecorator {
  return () => {}
}

class MyClass {
  @Prop()
  _string: string = ''

  @Prop()
  _number: number = 0

  @Prop()
  _boolean: boolean = false

  @Prop()
  _array: string[] = []

  @Prop()
  _union: string | number = ''

  @Prop()
  _intersect: {name: string} & {age: number} = {
    name: '',
    age: 0
  }

  @Prop()
  _null: null = null

  @Prop()
  _undefined: undefined = undefined
}

describe('Metadata Reflection', () => {
  it('Design type', () => {
    const StringCtor = getDesignType(MyClass, '_string')
    const NumberCtor = getDesignType(MyClass, '_number')
    const BooleanCtor = getDesignType(MyClass, '_boolean')
    const ArrayCtor = getDesignType(MyClass, '_array')
    const UnionCtor = getDesignType(MyClass, '_union')
    const IntersectCtor = getDesignType(MyClass, '_intersect')
    const NullCtor = getDesignType(MyClass, '_null')
    const UndefinedCtor = getDesignType(MyClass, '_undefined')

    expect(StringCtor).to.be.equal(String)
    expect(NumberCtor).to.be.equal(Number)
    expect(BooleanCtor).to.be.equal(Boolean)
    expect(ArrayCtor).to.be.equal(Array)
    expect(UnionCtor).to.be.equal(Object)
    expect(IntersectCtor).to.be.equal(Object)
    expect(NullCtor).to.be.equal(undefined)
    expect(UndefinedCtor).to.be.equal(undefined)
  })
})
