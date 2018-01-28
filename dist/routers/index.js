'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

Object.defineProperty(exports, 'userRouter', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_user).default;
  }
});

var _main = require('./main');

Object.defineProperty(exports, 'mainRouter', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_main).default;
  }
});

var _city = require('./city');

Object.defineProperty(exports, 'cityRouter', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_city).default;
  }
});

var _brewery = require('./brewery');

Object.defineProperty(exports, 'breweryRouter', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_brewery).default;
  }
});

var _post = require('./post');

Object.defineProperty(exports, 'postRouter', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_post).default;
  }
});

var _comment = require('./comment');

Object.defineProperty(exports, 'commentRouter', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_comment).default;
  }
});

var _brew = require('./brew');

Object.defineProperty(exports, 'brewRouter', {
  enumerable: true,
  get: function () {
    return _interopRequireDefault(_brew).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }