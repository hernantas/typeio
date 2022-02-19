import { LiteralType } from '../../alias/LiteralType'
import { LiteralSchema } from '../LiteralSchema'

export function literal<T extends LiteralType>(value: T): LiteralSchema<T> {
  return new LiteralSchema({ name: `'${value.toString()}'`, value })
}
