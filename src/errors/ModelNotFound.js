export default class ModelNotFoundError extends Error {
  constructor(model) {
    super(`${model} not found`)
    this.status = 404
  }
}
