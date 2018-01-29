'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _db = require('../config/db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const basename = _path2.default.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

let sequelize;

if (_db2.default.use_env_variable) {
  sequelize = new _sequelize2.default(process.env[_db2.default.use_env_variable], _db2.default);
} else {
  sequelize = new _sequelize2.default(_db2.default.database, _db2.default.username, _db2.default.password, _db2.default);
}

_fs2.default.readdirSync(__dirname).filter(file => {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(file => {
  const model = sequelize.import(_path2.default.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

/* modules */
db.sequelize = sequelize;
/* deps */
db.Sequelize = _sequelize2.default;

if (env !== 'test') {
  sequelize.sync({ force: true });
}

exports.default = db;