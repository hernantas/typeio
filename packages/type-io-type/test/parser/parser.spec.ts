import { expect } from 'chai'
import {
  any,
  array,
  ArrayCodec,
  boolean,
  BooleanCodec,
  DefaultCodec,
  intersect,
  IntersectCodec,
  literal,
  LiteralCodec,
  nullable,
  NullableCodec,
  number,
  NumberCodec,
  object,
  ObjectCodec,
  optional,
  OptionalCodec,
  Parser,
  string,
  StringCodec,
  tuple,
  TupleCodec,
  type,
  TypeCodec,
  union,
  UnionCodec,
  unknown,
  _null,
  _undefined,
} from '../../src'
import { User } from '../util/cases'

describe('Parser', () => {
  const parser = new Parser([StringCodec, NumberCodec, BooleanCodec])

  it('AnySchema', () => {
    expect(parser.find(any())).to.be.instanceOf(DefaultCodec)
  })

  it('ArraySchema', () => {
    expect(parser.find(array(string()))).to.be.instanceOf(ArrayCodec)
  })

  it('BooleanSchema', () => {
    expect(parser.find(boolean())).to.be.instanceOf(BooleanCodec)
  })

  it('IntersectSchema', () => {
    expect(
      parser.find(
        intersect(
          object({ _string: string() }),
          object({ _number: number() }),
          object({ _boolean: boolean() })
        )
      )
    ).to.be.instanceOf(IntersectCodec)
  })

  it('LiteralSchema', () => {
    expect(parser.find(literal('literal'))).to.be.instanceOf(LiteralCodec)
  })

  it('NullableSchema', () => {
    expect(parser.find(nullable(string()))).to.be.instanceOf(NullableCodec)
  })

  it('NullSchema', () => {
    expect(parser.find(_null())).to.be.instanceOf(DefaultCodec)
  })

  it('NumberSchema', () => {
    expect(parser.find(number())).to.be.instanceOf(NumberCodec)
  })

  it('ObjectSchema', () => {
    expect(
      parser.find(
        object({
          _string: string(),
          _number: number(),
          _boolean: boolean(),
        })
      )
    ).to.be.instanceOf(ObjectCodec)
  })

  it('OptionalSchema', () => {
    expect(parser.find(optional(string()))).to.be.instanceOf(OptionalCodec)
  })

  it('StringSchema', () => {
    expect(parser.find(string())).to.be.instanceOf(StringCodec)
  })

  it('TupleSchema', () => {
    expect(
      parser.find(
        tuple([string(), string(), number(), number(), boolean(), boolean()])
      )
    ).to.be.instanceOf(TupleCodec)
  })
  it('TypeSchema', () => {
    expect(parser.find(type(User))).to.be.instanceOf(TypeCodec)
    expect(parser.find(User)).to.be.instanceOf(TypeCodec)
  })
  it('UndefinedSchema', () => {
    expect(parser.find(_undefined())).to.be.instanceOf(DefaultCodec)
  })
  it('UnionSchema', () => {
    expect(parser.find(union(string(), number(), boolean()))).to.be.instanceOf(
      UnionCodec
    )
  })
  it('UnknownSchema', () => {
    expect(parser.find(unknown())).to.be.instanceOf(DefaultCodec)
  })

  // describe('Decode to string', () => {
  //   const schema = expect(parser.decode('MyString', schema)).to.have.property(
  //     'value',
  //     'MyString'
  //   )
  //   expect(parser.decode('0', schema)).to.have.property('value', '0')
  //   expect(parser.decode('true', schema)).to.have.property('value', 'true')
  //   expect(parser.decode(0, schema)).to.have.property('value', '0')
  //   expect(parser.decode(true, schema)).to.have.property('value', 'true')
  // })

  // it('Decode to number', () => {
  //   const schema = NumberSchema.create()
  //   expect(parser.decode(0, schema)).to.have.property('value', 0)
  //   expect(parser.decode('0', schema)).to.have.property('value', 0)
  //   expect(parser.decode('80', schema)).to.have.property('value', 80)
  //   expect(parser.decode('MyString', schema)).to.have.property('success', false)
  //   expect(parser.decode('true', schema)).to.have.property('success', false)
  //   expect(parser.decode(true, schema)).to.have.property('value', 1)
  //   expect(parser.decode(false, schema)).to.have.property('value', 0)
  // })

  // it('Decode to boolean', () => {
  //   const schema = BooleanSchema.create()
  //   expect(parser.decode(false, schema)).to.have.property('value', false)
  //   expect(parser.decode(0, schema)).to.have.property('value', false)
  //   expect(parser.decode(-0, schema)).to.have.property('value', false)
  //   expect(parser.decode('', schema)).to.have.property('value', false)
  //   expect(parser.decode(null, schema)).to.have.property('value', false)
  //   expect(parser.decode(undefined, schema)).to.have.property('value', false)
  //   expect(parser.decode(NaN, schema)).to.have.property('value', false)

  //   expect(parser.decode(true, schema)).to.have.property('value', true)
  //   expect(parser.decode({}, schema)).to.have.property('value', true)
  //   expect(parser.decode([], schema)).to.have.property('value', true)
  //   expect(parser.decode(42, schema)).to.have.property('value', true)
  //   expect(parser.decode('true', schema)).to.have.property('value', true)
  //   expect(parser.decode(-1, schema)).to.have.property('value', true)
  //   expect(parser.decode(3.14, schema)).to.have.property('value', true)
  //   expect(parser.decode(-3.14, schema)).to.have.property('value', true)
  //   expect(parser.decode(Infinity, schema)).to.have.property('value', true)
  //   expect(parser.decode(-Infinity, schema)).to.have.property('value', true)
  // })
})
