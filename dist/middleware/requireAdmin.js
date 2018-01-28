'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requireAuth = require('./requireAuth');

var _requireAuth2 = _interopRequireDefault(_requireAuth);

var _errors = require('../errors');

var errors = _interopRequireWildcard(_errors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_requireAuth2.default, (req, res, next) => {
  return req.user.isAdmin ? next() : next(new errors.UnauthorizedError());
}];