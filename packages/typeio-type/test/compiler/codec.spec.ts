import { expect } from 'chai'
import {
  ArrayCodec,
  BooleanCodec,
  CodecCompiler,
  DefaultCodec,
  IntersectCodec,
  LiteralCodec,
  NullableCodec,
  NumberCodec,
  ObjectCodec,
  OptionalCodec,
  StringCodec,
  TupleCodec,
  TypeCodec,
  UnionCodec,
  _null,
  _undefined,
  any,
  array,
  boolean,
  intersect,
  literal,
  nullable,
  number,
  object,
  optional,
  string,
  tuple,
  type,
  union,
  unknown,
} from '../../src'
import { User } from '../util/cases'

describe('Compiler', () => {
  describe('Codec', () => {
    const compiler = new CodecCompiler([
      new StringCodec(),
      new NumberCodec(),
      new BooleanCodec(),
    ])

    it('AnySchema', () => {
      expect(compiler.compile(any())).to.be.instanceOf(DefaultCodec)
    })

    it('ArraySchema', () => {
      expect(compiler.compile(array(string()))).to.be.instanceOf(ArrayCodec)
    })

    it('BooleanSchema', () => {
      expect(compiler.compile(boolean())).to.be.instanceOf(BooleanCodec)
    })

    it('IntersectSchema', () => {
      expect(
        compiler.compile(
          intersect(
            object({ _string: string() }),
            object({ _number: number() }),
            object({ _boolean: boolean() })
          )
        )
      ).to.be.instanceOf(IntersectCodec)
    })

    it('LiteralSchema', () => {
      expect(compiler.compile(literal('literal'))).to.be.instanceOf(
        LiteralCodec
      )
    })

    it('NullableSchema', () => {
      expect(compiler.compile(nullable(string()))).to.be.instanceOf(
        NullableCodec
      )
    })

    it('NullSchema', () => {
      expect(compiler.compile(_null())).to.be.instanceOf(DefaultCodec)
    })

    it('NumberSchema', () => {
      expect(compiler.compile(number())).to.be.instanceOf(NumberCodec)
    })

    it('ObjectSchema', () => {
      expect(
        compiler.compile(
          object({
            _string: string(),
            _number: number(),
            _boolean: boolean(),
          })
        )
      ).to.be.instanceOf(ObjectCodec)
    })

    it('OptionalSchema', () => {
      expect(compiler.compile(optional(string()))).to.be.instanceOf(
        OptionalCodec
      )
    })

    it('StringSchema', () => {
      expect(compiler.compile(string())).to.be.instanceOf(StringCodec)
    })

    it('TupleSchema', () => {
      expect(
        compiler.compile(
          tuple(string(), string(), number(), number(), boolean(), boolean())
        )
      ).to.be.instanceOf(TupleCodec)
    })
    it('TypeSchema', () => {
      expect(compiler.compile(type(User))).to.be.instanceOf(TypeCodec)
    })
    it('UndefinedSchema', () => {
      expect(compiler.compile(_undefined())).to.be.instanceOf(DefaultCodec)
    })
    it('UnionSchema', () => {
      expect(
        compiler.compile(union(string(), number(), boolean()))
      ).to.be.instanceOf(UnionCodec)
    })
    it('UnknownSchema', () => {
      expect(compiler.compile(unknown())).to.be.instanceOf(DefaultCodec)
    })
  })
})
