import { ConstructorType } from '../../alias/ConstructorType'
import { CodecAny } from '../../codec/alias/CodecAny'
import { SchemaAny } from '../../schema/alias/SchemaAny'
import { TypeOf } from '../../schema/helper/TypeOf'
import { CodecResolver } from './resolver/CodecResolver'
import { defaultResolver } from './resolver/defaultResolver'

export class Parser {
  readonly codecs: CodecAny[]
  readonly resolver: CodecResolver

  constructor(
    codecs: ConstructorType<CodecAny>[],
    resolver: CodecResolver = defaultResolver
  ) {
    this.codecs = codecs.map((Ctor) => new Ctor())
    this.resolver = resolver
  }

  find<S extends SchemaAny>(schema: S): CodecAny<S> {
    const result = this.codecs.filter(
      (codec) => codec.schema.name === schema.name
    )
    if (result.length > 0) {
      return result[0] as CodecAny<S>
    }

    const codec = this.resolver(schema, (s) => this.find(s))
    this.codecs.push(codec)
    return codec
  }

  decode<S extends SchemaAny>(value: unknown, schema: S): TypeOf<S> {
    return this.find(schema).decode(value)
  }

  encode<S extends SchemaAny>(value: unknown, schema: S): unknown {
    return this.find(schema).encode(value)
  }
}
