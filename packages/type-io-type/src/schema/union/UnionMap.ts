import { TupleType } from '../../alias'

export type UnionMap<T extends TupleType> = T[number]
