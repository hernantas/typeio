import { CodecAny } from '../../codec/alias/CodecAny'
import { TypeCodec } from '../../codec/TypeCodec'
import { SchemaAny } from '../../schema/alias/SchemaAny'
import { TypeSchema } from '../../schema/TypeSchema'
import { CodecResolver } from './CodecResolver'
import { CodecResolverFallback } from './CodecResolverFallback'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TypeSchemaAny = TypeSchema<any>

export class TypeResolver implements CodecResolver<TypeSchemaAny> {
  is(schema: SchemaAny): schema is TypeSchemaAny {
    return TypeSchema.isInstance(schema)
  }

  resolve(
    schema: TypeSchemaAny,
    fallback: CodecResolverFallback
  ): CodecAny<TypeSchemaAny> {
    return new TypeCodec(
      schema.type,
      Object.fromEntries(
        Object.entries(schema.properties).map(([key, property]) => [
          key,
          property !== undefined ? fallback(property) : undefined,
        ])
      ),
      Object.fromEntries(
        Object.entries(schema.properties).map(([key, property]) => [
          key,
          property !== undefined ? property.definition.inName : undefined,
        ])
      ),
      Object.fromEntries(
        Object.entries(schema.properties).map(([key, property]) => [
          key,
          property !== undefined ? property.definition.outName : undefined,
        ])
      )
    )
  }
}
