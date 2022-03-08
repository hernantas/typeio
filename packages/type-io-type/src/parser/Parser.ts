import { ConstructorType } from '../alias/ConstructorType'
import { CodecAny } from '../codec/alias/CodecAny'
import { SchemaAny } from '../schema/alias/SchemaAny'
import { BaseSchema } from '../schema/BaseSchema'
import { type } from '../schema/builder/type'
import { TypeSchema } from '../schema/TypeSchema'
import { ArrayResolver } from './resolver/ArrayResolver'
import { CodecResolver } from './resolver/CodecResolver'
import { CodecResolverFallback } from './resolver/CodecResolverFallback'
import { defaultResolver } from './resolver/defaultResolver'
import { IntersectResolver } from './resolver/IntersectResolver'
import { LiteralResolver } from './resolver/LiteralResolver'
import { NullableResolver } from './resolver/NullableResolver'
import { ObjectResolver } from './resolver/ObjectResolver'
import { OptionalResolver } from './resolver/OptionalResolver'
import { TupleResolver } from './resolver/TupleResolver'
import { TypeResolver } from './resolver/TypeResolver'
import { UnionResolver } from './resolver/UnionResolver'

export class Parser {
  readonly codecs: CodecAny[]
  readonly resolvers: CodecResolver[]

  constructor(
    codecs: ConstructorType<CodecAny>[],
    resolvers: ConstructorType<CodecResolver>[] = [
      ArrayResolver,
      IntersectResolver,
      LiteralResolver,
      NullableResolver,
      ObjectResolver,
      OptionalResolver,
      TupleResolver,
      TypeResolver,
      UnionResolver,
    ],
    readonly resolverFallback: CodecResolverFallback = defaultResolver
  ) {
    this.codecs = codecs.map((Ctor) => new Ctor())
    this.resolvers = resolvers.map((Ctor) => new Ctor())
  }

  find<T>(schemaOrCtor: ConstructorType<T>): CodecAny<TypeSchema<T>>
  find<S extends SchemaAny>(schemaOrCtor: S): CodecAny<S>
  find<T, S extends BaseSchema<T>>(
    schemaOrCtor: S | ConstructorType<T>
  ): CodecAny<S>
  find<T, S extends BaseSchema<T>>(
    schemaOrCtor: S | ConstructorType<T>
  ): CodecAny<S> {
    const schema =
      typeof schemaOrCtor === 'object' ? schemaOrCtor : type(schemaOrCtor)
    const result = this.codecs.filter(
      (codec) => codec.schema.name === schema.name
    )
    if (result.length > 0) {
      return result[result.length - 1] as CodecAny<S>
    }

    const resolvers = this.resolvers.filter((resolver) => resolver.is(schema))
    const resolver =
      resolvers.length > 0 ? resolvers[resolvers.length - 1] : undefined
    return (
      resolver !== undefined
        ? resolver.resolve(schema, (s) => this.find(s))
        : this.resolverFallback(schema)
    ) as CodecAny<S>
  }

  decode<T>(value: unknown, schema: BaseSchema<T> | ConstructorType<T>): T {
    return this.find(schema).decode(value)
  }

  encode<T>(value: T, schema: BaseSchema<T> | ConstructorType<T>): unknown {
    return this.find(schema).encode(value)
  }
}
