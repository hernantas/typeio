export interface Decoder<T, I = unknown> {
  decode(value: I): T
}
