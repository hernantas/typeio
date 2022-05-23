import { SchemaAny } from '../schema/alias/SchemaAny'
import { TypeOf } from '../schema/helper/TypeOf'

export interface Codec<
  T extends SchemaAny = SchemaAny,
  O = TypeOf<T>,
  I = unknown
> {
  readonly name: string
  decode(value: I): TypeOf<T>
  encode(value: TypeOf<T>): O
}
