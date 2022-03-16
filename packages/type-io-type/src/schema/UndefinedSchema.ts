import { BaseSchema } from './BaseSchema'

export class UndefinedSchema extends BaseSchema<undefined> {
  readonly _kind: string = 'undefined'

  static create(): UndefinedSchema {
    return new UndefinedSchema({ name: this.createName() })
  }

  static createName(): string {
    return 'Undefined'
  }

  override is(input: unknown): input is undefined {
    return typeof input === 'undefined'
  }
}
