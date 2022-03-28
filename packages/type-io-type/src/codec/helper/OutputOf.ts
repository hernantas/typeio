import { Codec } from '../Codec'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OutputOf<T> = T extends Codec<any, infer R, any> ? R : never
