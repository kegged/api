'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _errors = require('../errors');

var errors = _interopRequireWildcard(_errors);

var _errors2 = require('sequelize/lib/errors');

var sequelizeErrors = _interopRequireWildcard(_errors2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = (err, req, res, next) => {
  let $err = err;
  // wrap sequelize errors
  if (err instanceof sequelizeErrors.BaseError) {
    if (err instanceof sequelizeErrors.UniqueConstraintError) {
      console.log('err => ', err.fields);
      $err = new errors.UniqueConstraintError(Object.keys(err.fields)[0] || 'field');
    }
    // wrap joi errors
  } else if (err.isJoi) {
    $err = new errors.ValidationError(err.details[0].message);
  }

  next($err);
};