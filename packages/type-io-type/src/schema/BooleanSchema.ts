import { BaseSchema } from './BaseSchema'

export class BooleanSchema extends BaseSchema<boolean> {
  readonly _kind: string = 'boolean'

  static create(): BooleanSchema {
    return new BooleanSchema({ name: 'Boolean' })
  }

  is(input: unknown): input is boolean {
    return typeof input === 'boolean'
  }
}
