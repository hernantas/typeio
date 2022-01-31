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

  newInstance(definition: T): this {
    const Constructor = this.constructor as ConstructorType<this>
    return new Constructor(definition)
  }
}
