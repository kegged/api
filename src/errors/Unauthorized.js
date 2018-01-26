export default class UnauthorizedError extends Error {
  constructor(reason) {
    super(reason ? `Unauthorized: ${reason}` : 'Unauthorized')
    this.status = 401
  }
}
