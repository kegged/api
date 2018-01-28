'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _errors = require('../errors');

var errors = _interopRequireWildcard(_errors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthController {

  static login(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      const { userName, passWord } = req.body;

      // resolve user by userName
      const user = yield _models2.default.User.findOne({ where: { userName } });
      if (!user) return next(new errors.ModelNotFoundError('user'));

      const isMatch = yield user.checkPassword(passWord);
      if (!isMatch) {
        const err = new Error('incorrect password');
        err.status = 401;
        return next(err);
      }

      const token = yield user.generateToken();

      res.status(200).json({ token });
    })();
  }

}
exports.default = AuthController;