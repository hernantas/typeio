export interface Encoder<T, O = T> {
  encode(value: T): O
}
