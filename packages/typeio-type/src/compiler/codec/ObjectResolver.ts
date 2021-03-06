import { CodecAny } from '../../codec/alias/CodecAny'
import { ObjectCodec } from '../../codec/ObjectCodec'
import { ObjectSchemaType } from '../../schema/alias/ObjectSchemaType'
import { SchemaAny } from '../../schema/alias/SchemaAny'
import { ObjectSchema } from '../../schema/ObjectSchema'
import { CodecResolver } from './CodecResolver'
import { CodecResolverFallback } from './CodecResolverFallback'

export class ObjectResolver
  implements CodecResolver<ObjectSchema<ObjectSchemaType>>
{
  is(schema: SchemaAny): schema is ObjectSchema<ObjectSchemaType> {
    return ObjectSchema.isInstance(schema)
  }

  resolve(
    schema: ObjectSchema<ObjectSchemaType>,
    fallback: CodecResolverFallback
  ): CodecAny<ObjectSchema<ObjectSchemaType>> {
    return new ObjectCodec(
      Object.fromEntries(
        Object.entries(schema.properties).map(([key, property]) => [
          key,
          fallback(property),
        ])
      ),
      Object.fromEntries(
        Object.entries(schema.properties).map(([key, property]) => [
          key,
          property.definition.inName,
        ])
      ),
      Object.fromEntries(
        Object.entries(schema.properties).map(([key, property]) => [
          key,
          property.definition.outName,
        ])
      )
    )
  }
}
