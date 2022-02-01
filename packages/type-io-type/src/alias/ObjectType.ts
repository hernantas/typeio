/**
 * Alias type to represent `object` type with property. This should be used instead
 * since in future it can be changed to better type that can represent it better.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ObjectType<T = any> = {
  [K in keyof T]: unknown
}
