import { CodecAny } from '../../../codec/alias/CodecAny'
import { DefaultCodec } from '../../../codec/DefaultCodec'
import { SchemaAny } from '../../../schema/alias/SchemaAny'
import { ArraySchema } from '../../../schema/ArraySchema'
import { IntersectSchema } from '../../../schema/IntersectSchema'
import { LiteralSchema } from '../../../schema/LiteralSchema'
import { NullableSchema } from '../../../schema/NullableSchema'
import { ObjectSchema } from '../../../schema/ObjectSchema'
import { OptionalSchema } from '../../../schema/OptionalSchema'
import { TupleSchema } from '../../../schema/TupleSchema'
import { TypeSchema } from '../../../schema/TypeSchema'
import { UnionSchema } from '../../../schema/UnionSchema'
import { arrayResolver } from './arrayResolver'
import { CodecResolverFallback } from './CodecResolverFallback'
import { intersectResolver } from './intersectResolver'
import { literalResolver } from './literalResolver'
import { nullableResolver } from './nullableResolver'
import { objectResolver } from './objectResolver'
import { optionalResolver } from './optionalResolver'
import { tupleResolver } from './tupleResolver'
import { typeResolver } from './typeResolver'
import { unionResolver } from './unionResolver'

export function defaultResolver<S extends SchemaAny>(
  schema: S,
  fallback: CodecResolverFallback
): CodecAny<S> {
  if (ArraySchema.is(schema)) {
    return arrayResolver(schema, fallback)
  } else if (NullableSchema.is(schema)) {
    return nullableResolver(schema, fallback)
  } else if (OptionalSchema.is(schema)) {
    return optionalResolver(schema, fallback)
  } else if (LiteralSchema.is(schema)) {
    return literalResolver(schema)
  } else if (ObjectSchema.is(schema)) {
    return objectResolver(schema, fallback)
  } else if (TypeSchema.is(schema)) {
    return typeResolver(schema, fallback)
  } else if (TupleSchema.is(schema)) {
    return tupleResolver(schema, fallback)
  } else if (UnionSchema.is(schema)) {
    return unionResolver(schema, fallback)
  } else if (IntersectSchema.is(schema)) {
    return intersectResolver(schema, fallback)
  }
  return new DefaultCodec(schema)
}
