import { CodecAny } from '../../codec/alias/CodecAny'
import { CodecMap } from '../../codec/helper/CodecMap'
import { TypeCodec } from '../../codec/TypeCodec'
import { SchemaAny } from '../../schema/alias/SchemaAny'
import { TypeSchema } from '../../schema/TypeSchema'
import { CodecResolver } from './CodecResolver'
import { CodecResolverFallback } from './CodecResolverFallback'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TypeSchemaAny = TypeSchema<any>

export class TypeResolver implements CodecResolver<TypeSchemaAny> {
  is(schema: SchemaAny): schema is TypeSchemaAny {
    return TypeSchema.is(schema)
  }

  resolve(
    schema: TypeSchemaAny,
    fallback: CodecResolverFallback
  ): CodecAny<TypeSchemaAny> {
    return new TypeCodec(
      schema.type,
      Object.keys(schema.properties).reduce(
        (prev, key) => ({
          ...prev,
          [key]: fallback(schema.properties[key] as SchemaAny),
        }),
        {} as CodecMap<unknown>
      )
    )
  }
}
