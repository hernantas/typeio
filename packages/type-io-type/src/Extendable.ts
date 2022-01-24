import { ConstructorType } from './alias/ConstructorType'

export class Extendable<T> {
  readonly definition: T

  constructor (definition: T) {
    this.definition = definition
  }

  newInstance (definition: T): this {
    const Constructor = this.constructor as ConstructorType<this>
    return new Constructor(definition)
  }
}
