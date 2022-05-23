import { ConstructorType } from '../alias/ConstructorType'
import { CodecAny } from '../codec/alias/CodecAny'
import { BooleanCodec } from '../codec/BooleanCodec'
import { NumberCodec } from '../codec/NumberCodec'
import { StringCodec } from '../codec/StringCodec'
import { CodecCompiler } from '../compiler/codec/CodecCompiler'
import { SchemaAny } from '../schema/alias/SchemaAny'
import { type } from '../schema/builder/type'

export class Parser {
  private readonly compiler: CodecCompiler

  constructor(
    codecs: CodecAny[] = [
      new StringCodec(),
      new NumberCodec(),
      new BooleanCodec(),
    ]
  ) {
    this.compiler = new CodecCompiler(codecs)
  }

  prepare(schema: SchemaAny | SchemaAny[]): void {
    if (Array.isArray(schema)) {
      schema.forEach((s) => this.compiler.compile(s))
    } else {
      this.compiler.compile(schema)
    }
  }

  decode<T>(value: unknown, schema: SchemaAny<T> | ConstructorType<T>): T {
    return this.compiler
      .compile(typeof schema === 'function' ? type(schema) : schema)
      .decode(value)
  }

  encode<T>(value: T, schema: SchemaAny<T> | ConstructorType<T>): unknown {
    return this.compiler
      .compile(typeof schema === 'function' ? type(schema) : schema)
      .encode(value)
  }
}
