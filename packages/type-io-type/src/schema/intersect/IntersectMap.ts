import { TupleType } from '../../alias/TupleType'
import { UnionMap } from '../union/UnionMap'

type IntersectOf<T> =
  (T extends unknown ? (key: T) => void : never) extends ((key: infer I) => void)
    ? I
    : never

export type IntersectMap<T extends TupleType> = IntersectOf<UnionMap<T>>
