'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });

  User.associate = models => {
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      as: 'posts'
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'comments'
    });
  };

  User.$publicScope = ['userName', 'firstName', 'lastName', 'email', 'id'];

  User.$privateScope = [...User.$publicScope, 'salt', 'hash', 'isAdmin'];

  User.defaultScope = {
    attributes: User.$publicScope
  };

  User.prototype.generateToken = (0, _asyncToGenerator3.default)(function* () {
    const { userName, email, isAdmin, id } = this;
    return _jsonwebtoken2.default.sign({
      userName,
      email,
      isAdmin,
      id
    }, 'secret');
  });

  User.prototype.checkPassword = (() => {
    var _ref2 = (0, _asyncToGenerator3.default)(function* (attempt) {
      const { hash } = this;
      const isMatch = yield _bcryptjs2.default.compare(attempt, hash);
      return isMatch;
    });

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  })();

  return User;
};