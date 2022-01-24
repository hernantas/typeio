import { TupleType } from '../../alias/TupleType'

export type UnionMap<T extends TupleType> = T[number]
