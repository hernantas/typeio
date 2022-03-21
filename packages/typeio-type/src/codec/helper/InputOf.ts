import { Codec } from '../Codec'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InputOf<T> = T extends Codec<any, any, infer R> ? R : never
