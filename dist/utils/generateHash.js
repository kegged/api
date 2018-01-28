'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (password) {
    const salt = yield _bcryptjs2.default.genSalt(10);
    const hash = yield _bcryptjs2.default.hash(password, salt);
    return { salt, hash };
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();