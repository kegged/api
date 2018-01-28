'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _extends3.default)({}, (() => {
  const {
    DB_USER,
    DB_PASS,
    DB_NAME,
    DB_HOST,
    NODE_ENV,
    SQLITE_PATH
  } = process.env;

  switch (NODE_ENV) {
    case 'test':
      return { dialect: 'sqlite', storage: ':memory:', logging: false };
    case 'development':
      return { dialect: 'sqlite', storage: SQLITE_PATH };
    case 'production':
      return {
        username: 'root',
        port: 3306,
        password: DB_PASS || '',
        database: DB_NAME || 'kegged_local',
        dialect: 'mysql',
        host: DB_HOST || 'localhost'
      };
  }
})(), { operatorsAliases: false });