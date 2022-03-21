import { Codec } from '../interface/Codec'

export type SchemaOf<T> = T extends Codec<infer R, unknown, unknown> ? R : never
