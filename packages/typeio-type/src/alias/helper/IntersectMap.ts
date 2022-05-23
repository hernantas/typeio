import { IntersectType } from '../IntersectType'
import { UnionMap } from './UnionMap'

type IntersectOf<T> = (T extends unknown ? (key: T) => void : never) extends (
  key: infer I
) => void
  ? I
  : never

export type IntersectMap<T extends IntersectType> = IntersectOf<UnionMap<T>>
