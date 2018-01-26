export default class UniqueConstraintError extends Error {
  constructor(field) {
    super(`The ${field} already exists`)
    this.status = 400
  }
}
