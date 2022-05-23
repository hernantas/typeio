import { Schema } from './Schema'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class AnySchema extends Schema<any> {
  readonly _kind: string = 'any'

  static create(): AnySchema {
    return new AnySchema({ name: this.createName() })
  }

  static createName(): string {
    return `Any`
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override is(_input: unknown): _input is any {
    return true
  }
}
