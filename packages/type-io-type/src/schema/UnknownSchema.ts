import { BaseSchema } from './BaseSchema'

export class UnknownSchema extends BaseSchema<unknown> {
  readonly _kind: string = 'unknown'

  static create(): UnknownSchema {
    return new UnknownSchema({ name: 'Unknown' })
  }

  override is(_input: unknown): _input is unknown {
    return true
  }
}
