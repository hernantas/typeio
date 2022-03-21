import { ConstructorType } from './alias/ConstructorType'

export class Extendable<T> {
  readonly definition: T

  /**
   * NEVER OVERRIDE CONSTRUCTOR. Init definition value
   *
   * @param definition New definition for new instance
   */
  constructor(definition: T) {
    this.definition = definition
  }

  /**
   * Create new instance of current object with given attribute of `<T>`
   *
   * @param key Key of `<T>`
   * @param value New value
   * @returns New instance of current object
   */
  assign<K extends keyof T>(key: K, value: T[K]): this {
    const Constructor = this.constructor as ConstructorType<this>
    return new Constructor({
      ...this.definition,
      [key]: value,
    })
  }
}
