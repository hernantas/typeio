import { UnionType } from '../UnionType'

export type UnionMap<T extends UnionType> = T[number]
