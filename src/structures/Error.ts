export class SagsdbError extends Error {
  constructor(message: string) {
    super(`${message}`);
  }
}
