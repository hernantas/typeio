/**
 * Alias for constructor type
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConstructorType<T = unknown> = new (...args: any[]) => T
