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

class CityController {

  static getCities(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      try {
        const cities = yield _models2.default.City.findAll({
          include: CityController.cityEagerGraph
        });

        res.status(200).json(cities);
      } catch (err) {
        next(err);
      }
    })();
  }

  static getCity(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      const { slug } = req.params;

      try {
        const city = yield _models2.default.City.findOne({
          where: { slug },
          include: CityController.cityEagerGraph
        });
        if (!city) throw new errors.ModelNotFoundError('City');

        res.status(200).json(city);
      } catch (err) {
        next(err);
      }
    })();
  }

}
exports.default = CityController;
CityController.cityEagerGraph = [{ model: _models2.default.Brewery, as: 'breweries' }];