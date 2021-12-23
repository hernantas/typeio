import { TupleType } from '../../alias'
import { UnionMap } from '../union'

type IntersectOf<T> =
  (T extends unknown ? (key: T) => void : never) extends ((key: infer I) => void)
    ? I
    : never

export type IntersectMap<T extends TupleType> = IntersectOf<UnionMap<T>>
