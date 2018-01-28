'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something broke ):';
  const body = { status, message, error: true };

  const isServerError = status >= 500;

  if (isServerError) console.error(err);

  if (isServerError && process.NODE_ENV !== 'production') {
    return res.status(status).json((0, _extends3.default)({}, body, { stack: err.stack }));
  }

  res.status(status).json(body);
};