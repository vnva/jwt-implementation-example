export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly response?: unknown
  ) {
    super(`${status} | HTTP ERROR`);
  }
}
