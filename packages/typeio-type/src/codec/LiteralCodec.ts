import { LiteralType } from '../alias/LiteralType'
import { TypeGuard } from '../alias/TypeGuard'
import { BooleanSchema } from '../schema/BooleanSchema'
import { LiteralSchema } from '../schema/LiteralSchema'
import { NumberSchema } from '../schema/NumberSchema'
import { StringSchema } from '../schema/StringSchema'
import { CodecAny } from './alias/CodecAny'
import { BooleanCodec } from './BooleanCodec'
import { DecodeError } from './error/DecodeError'
import { Codec } from './Codec'
import { NumberCodec } from './NumberCodec'
import { StringCodec } from './StringCodec'

export class LiteralCodec<T extends LiteralType>
  implements Codec<LiteralSchema<T>>
{
  readonly name: string

  readonly value: T

  readonly isType: TypeGuard<string> | TypeGuard<number> | TypeGuard<boolean>

  readonly codec:
    | CodecAny<StringSchema>
    | CodecAny<NumberSchema>
    | CodecAny<BooleanSchema>

  constructor(value: T) {
    this.name = LiteralSchema.createName(value.toString())
    this.value = value
    switch (typeof this.value) {
      case 'string':
        this.isType = (v: unknown): v is string => typeof v === 'string'
        this.codec = new StringCodec()
        break
      case 'number':
        this.isType = (v: unknown): v is number => typeof v === 'number'
        this.codec = new NumberCodec()
        break
      case 'boolean':
        this.isType = (v: unknown): v is boolean => typeof v === 'boolean'
        this.codec = new BooleanCodec()
        break
    }
  }

  decode(value: unknown): T {
    const decoded = this.isType(value) ? value : this.codec.decode(value)
    if (decoded === this.value) {
      return this.value
    }
    throw new DecodeError(this.name)
  }

  encode(value: T): T {
    return value
  }
}
