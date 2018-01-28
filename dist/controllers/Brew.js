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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BrewController {

  static getBrews(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      try {
        const brews = yield _models2.default.Brew.findAll({
          include: BrewController.brewEagerGraph
        });
        res.status(200).json(brews);
      } catch (err) {
        next(err);
      }
    })();
  }

  static getBrew(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      const { city, brewery, slug } = req.params;

      try {
        const $city = yield _models2.default.City.findOne({ where: { slug: city } });
        if (!$city) throw new errors.ModelNotFoundError('City');

        const $brewery = yield _models2.default.Brewery.findOne({
          where: { slug: brewery, cityId: $city.id }
        });
        if (!$brewery) throw new errors.ModelNotFoundError('Brewery');

        const brew = yield _models2.default.Brew.findOne({
          where: { slug, breweryId: $brewery.id },
          include: BrewController.brewEagerGraph
        });
        if (!brew) throw new errors.ModelNotFoundError('Brew');

        res.status(200).json(brew);
      } catch (err) {
        next(err);
      }
    })();
  }

  static createBrew(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      const { body } = req;

      try {
        _joi2.default.assert(body, BrewController.newBrewSchema);

        const brewery = yield _models2.default.Brewery.findById(body.breweryId);
        if (!brewery) throw new errors.ModelNotFoundError('Brewery');

        const brew = yield _models2.default.Brew.create(body);

        const tags = [];
        if (body.tags) {
          for (const tagName of body.tags) {
            const [tag] = yield _models2.default.Tag.findOrCreate({ where: { name: tagName } });
            const [brewTag] = yield _models2.default.BrewTag.findOrCreate({
              where: { brewId: brew.id, tagId: tag.id }
            });

            tags.push((0, _extends3.default)({}, brewTag.dataValues, { tag: tag.dataValues }));
          }
        }

        res.status(201).send({
          newBrew: (0, _extends3.default)({}, brew.dataValues, { tags, brewery: brewery.dataValues })
        });
      } catch (err) {
        next(err);
      }
    })();
  }

}
exports.default = BrewController;
BrewController.newBrewSchema = _joi2.default.object().keys({
  name: _joi2.default.string().required(),
  photoUrl: _joi2.default.string().required(),
  breweryId: _joi2.default.number().required(),
  tags: _joi2.default.array().items(_joi2.default.string())
});
BrewController.updateBrewSchema = _joi2.default.object().keys({
  name: _joi2.default.string(),
  photoUrl: _joi2.default.string()
});
BrewController.brewEagerGraph = [{ model: _models2.default.Brewery, as: 'brewery', include: [{ model: _models2.default.City, as: 'city' }] }, { model: _models2.default.BrewTag, as: 'tags', include: [{ model: _models2.default.Tag, as: 'tag' }] }];