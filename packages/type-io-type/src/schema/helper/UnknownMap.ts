export type UnknownMap<T> = {
  [K in keyof T]: unknown
}
