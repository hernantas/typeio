import { TestSuite } from './TestSuite'

export type TestSuiteMap<T> = T extends Array<infer R>
  ? TestSuite<R>
  : {
      [K in keyof T]: TestSuiteMap<T[K]>
    }
