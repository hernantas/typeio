export class DecodeError extends Error {
  constructor(type: string, message?: string) {
    super(message ?? `Cannot decode input. Must be a "${type}" type`)
    this.name = 'DecodeError'
  }
}
