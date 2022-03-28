import { Schema } from './Schema'

export class NullSchema extends Schema<null> {
  readonly _kind: string = 'null'

  static create(): NullSchema {
    return new NullSchema({ name: this.createName() })
  }

  static createName(): string {
    return 'Null'
  }

  override is(input: unknown): input is null {
    return input === null
  }
}
