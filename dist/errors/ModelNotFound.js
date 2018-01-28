"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
class ModelNotFoundError extends Error {
  constructor(model) {
    super(`${model} not found`);
    this.status = 404;
  }
}
exports.default = ModelNotFoundError;