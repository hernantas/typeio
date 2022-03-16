import { CodecAny } from '../../codec/alias/CodecAny'
import { SchemaAny } from '../../schema/alias/SchemaAny'
import { Compiler } from '../Compiler'
import { ArrayResolver } from './ArrayResolver'
import { CodecResolver } from './CodecResolver'
import { CodecResolverFallback } from './CodecResolverFallback'
import { defaultResolver } from './defaultResolver'
import { IntersectResolver } from './IntersectResolver'
import { LiteralResolver } from './LiteralResolver'
import { NullableResolver } from './NullableResolver'
import { ObjectResolver } from './ObjectResolver'
import { OptionalResolver } from './OptionalResolver'
import { TupleResolver } from './TupleResolver'
import { TypeResolver } from './TypeResolver'
import { UnionResolver } from './UnionResolver'

export class CodecCompiler extends Compiler {
  constructor(
    codecs: CodecAny[],
    resolvers: CodecResolver[] = [
      new ArrayResolver(),
      new IntersectResolver(),
      new LiteralResolver(),
      new NullableResolver(),
      new ObjectResolver(),
      new OptionalResolver(),
      new TupleResolver(),
      new TypeResolver(),
      new UnionResolver(),
    ],
    resolverFallback: CodecResolverFallback = defaultResolver
  ) {
    super(
      new Map(codecs.map((codec) => [codec.schema.name, codec])),
      resolvers,
      resolverFallback
    )
  }

  override compile<S extends SchemaAny>(schema: S): CodecAny<S> {
    return super.compile(schema) as CodecAny<S>
  }
}
