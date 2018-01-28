'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CityController {

  static getCities(req, res) {
    return (0, _asyncToGenerator3.default)(function* () {
      console.dir(_models2.default);
      const cities = yield _models2.default.City.findAll({});
      res.status(200).json(cities);
    })();
  }

}
exports.default = CityController;