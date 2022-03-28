import { SchemaAny } from '../schema/alias/SchemaAny'
import { TypeOf } from '../schema/helper/TypeOf'
import { DefaultParser } from './DefaultParser'

export class PlainParser extends DefaultParser {
  decodeJson<S extends SchemaAny>(value: string, schema: S): TypeOf<S> {
    return this.decode(JSON.parse(value), schema)
  }

  encodeJson<S extends SchemaAny>(value: TypeOf<S>, schema: S): string {
    return JSON.stringify(this.encode(value, schema))
  }
}
