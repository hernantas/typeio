import { BaseSchema } from './BaseSchema'

export class BooleanSchema extends BaseSchema<boolean> {
  readonly _kind: string = 'boolean'

  static create(): BooleanSchema {
    return new BooleanSchema({ name: this.createName() })
  }

  static createName(): string {
    return 'Boolean'
  }

  override is(input: unknown): input is boolean {
    return typeof input === 'boolean'
  }
}
