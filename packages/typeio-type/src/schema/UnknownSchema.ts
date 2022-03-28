import { Schema } from './Schema'

export class UnknownSchema extends Schema<unknown> {
  readonly _kind: string = 'unknown'

  static create(): UnknownSchema {
    return new UnknownSchema({ name: this.createName() })
  }

  static createName(): string {
    return 'Unknown'
  }

  override is(_input: unknown): _input is unknown {
    return true
  }
}
