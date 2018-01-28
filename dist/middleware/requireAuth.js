'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (req, res, next) {
    let payload;
    try {
      const token = req.get('Authorization').split('Bearer').pop().trim();
      payload = _jsonwebtoken2.default.verify(token, 'secret');
      // the token was invalid; throw error
      if (!Object.keys(payload).length) throw Error();
    } catch (e) {
      const err = new Error('unauthorizaed');
      err.status = 401;
      return next(err);
    }
    // mount user to req
    req.user = payload;
    next();
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();