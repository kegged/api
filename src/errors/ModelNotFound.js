export default class ModelNotFound extends Error {
  constructor(model) {
    super(`${model} not found`)
    this.status = 404
  }
}
