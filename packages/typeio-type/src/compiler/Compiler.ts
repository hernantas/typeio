import { SchemaAny } from '../schema/alias/SchemaAny'
import { Resolver } from './Resolver'
import { ResolverFallback } from './ResolverFallback'

export class Compiler {
  constructor(
    private caches: Map<string, unknown>,
    private readonly resolvers: Resolver[] = [],
    private readonly resolverFallback: ResolverFallback
  ) {}

  compile<S extends SchemaAny>(schema: S): unknown {
    if (this.caches.has(schema.name)) {
      return this.caches.get(schema.name)
    }

    const resolvers = this.resolvers.filter((resolver) => resolver.is(schema))
    const resolver =
      resolvers.length > 0 ? resolvers[resolvers.length - 1] : undefined
    const compiled =
      resolver !== undefined
        ? resolver.resolve(schema, (s) => this.compile(s))
        : this.resolverFallback(schema)
    this.caches.set(schema.name, compiled)
    return compiled
  }
}
