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
   * Create a new instance of current object
   *
   * @param definition New definition
   * @returns Instance of current object
   */
  newInstance(definition: T): this {
    const Constructor = this.constructor as ConstructorType<this>
    return new Constructor(definition)
  }
}
