'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class UnauthorizedError extends Error {
  constructor(reason) {
    super(reason ? `Unauthorized: ${reason}` : 'Unauthorized');
    this.status = 401;
  }
}
exports.default = UnauthorizedError;