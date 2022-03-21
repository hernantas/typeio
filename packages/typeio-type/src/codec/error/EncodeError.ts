export class EncodeError extends Error {
  constructor(type: string, message?: string) {
    super(message ?? `Cannot encode input. Must be a "${type}" type`)
    this.name = 'EncodeError'
  }
}
