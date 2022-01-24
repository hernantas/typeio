import { BaseSchema } from './BaseSchema'

export class UnknownSchema extends BaseSchema<unknown> {
  static create (): UnknownSchema {
    return new UnknownSchema({ name: 'Unknown' })
  }

  is (_input: unknown): _input is unknown {
    return true
  }
}
