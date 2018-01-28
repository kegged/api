"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
class UniqueConstraintError extends Error {
  constructor(field) {
    super(`The ${field} already exists`);
    this.status = 400;
  }
}
exports.default = UniqueConstraintError;