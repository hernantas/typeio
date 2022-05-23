/** Alias for constructor type */
export interface ConstructorType<T = unknown> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T
}
