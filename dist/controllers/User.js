'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _errors = require('../errors');

var errors = _interopRequireWildcard(_errors);

var _utils = require('../utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserController {

  static createUser(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      const { body } = req;

      try {
        _joi2.default.assert(body, UserController.newUserSchema);

        const { hash, salt } = yield (0, _utils.generateHash)(body.passWord);

        const newUser = yield _models2.default.User.create((0, _extends3.default)({}, body, { hash, salt
        }));

        const token = yield newUser.generateToken();

        res.status(201).json({ newUser, token });
      } catch (err) {
        next(err);
      }
    })();
  }

  static updateUser(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      const { body, params } = req;

      try {
        _joi2.default.assert(body, UserController.updateUserSchema);

        if (req.user.userName !== params.userName && !req.user.isAdmin) {
          throw new errors.UnauthorizedError();
        }

        const user = yield _models2.default.User.findOne({
          where: { userName: params.userName }
        });
        if (!user) throw new errors.ModelNotFoundError('User');

        if (typeof body.passWord === 'string') {
          const { salt, hash } = yield (0, _utils.generateHash)(body.passWord);
          body.salt = salt;
          body.hash = hash;
        }

        yield user.updateAttributes(body);
        console.log('username', user.userName);

        res.status(200).json({ updatedUser: user });
      } catch (err) {
        next(err);
      }
    })();
  }

  static deleteUser(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      const { userName } = req.params;

      try {
        const user = yield _models2.default.User.findOne({ where: { userName } });
        if (!user) throw new errors.ModelNotFoundError('User');

        if (req.user.userName !== userName && !req.user.isAdmin) {
          throw new errors.UnauthorizedError();
        }

        yield _models2.default.User.destroy({ where: { userName } });

        res.status(200).json({ deletedUser: user });
      } catch (err) {
        next(err);
      }
    })();
  }

  static getUser(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      const { userName } = req.params;

      try {
        const user = yield _models2.default.User.findOne({
          where: { userName },
          attributes: _models2.default.User.$publicScope,
          include: UserController.userEagerGraph
        });
        if (!user) throw new errors.ModelNotFoundError('User');

        res.status(200).json({ user });
      } catch (err) {
        next(err);
      }
    })();
  }

  static getUsers(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      try {
        const users = yield _models2.default.User.findAll({ attributes: UserController.publicAttributes });
        res.status(200).send({ users });
      } catch (err) {
        next(err);
      }
    })();
  }

  static getUserByEmail(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      const { slug } = req.params;

      try {
        if (!slug) throw new errors.ValidationError('Email is required');

        const user = yield _models2.default.User.findOne({ where: { email: slug } });
        if (!user) throw new errors.ModelNotFoundError('User');

        res.status(200).json({ user });
      } catch (err) {
        next(err);
      }
    })();
  }

}
exports.default = UserController;
UserController.publicAttributes = ['id', 'userName', 'firstName', 'lastName', 'email'];
UserController.newUserSchema = _joi2.default.object().keys({
  email: _joi2.default.string().email().required(),
  userName: _joi2.default.string().alphanum().min(3).max(20).required(),
  passWord: _joi2.default.string().min(8).max(20).required(),
  firstName: _joi2.default.string().max(50).required(),
  lastName: _joi2.default.string().max(50).required()
});
UserController.updateUserSchema = _joi2.default.object().keys({
  email: _joi2.default.string().email(),
  userName: _joi2.default.string().alphanum().min(3).max(20),
  passWord: _joi2.default.string().min(8).max(20),
  firstName: _joi2.default.string().max(50),
  lastName: _joi2.default.string().max(50)
});
UserController.userEagerGraph = [{ model: _models2.default.Post, as: 'posts' }, { model: _models2.default.Comment, as: 'comments' }];