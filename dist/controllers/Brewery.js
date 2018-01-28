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

class BreweryController {

  static getBreweries(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      const { include } = req.query;
      const breweries = yield _models2.default.Brewery.findAll({
        include: BreweryController.multiBreweryEagerGraph
      });

      res.status(200).json(breweries);
    })();
  }

  static getBrewery(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      const { city, slug } = req.params;

      const $city = yield _models2.default.City.findOne({ where: { slug: city } });
      if (!$city) return next(new errors.ModelNotFoundError('City'));

      const brewery = yield _models2.default.Brewery.findOne({
        where: { slug, cityId: $city.id },
        include: BreweryController.singleBreweryEagerGraph
      });
      if (!brewery) return next(new errors.ModelNotFoundError('Brewery'));

      res.status(200).json(brewery);
    })();
  }

  static createBrewery(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      const { body } = req;

      try {
        _joi2.default.assert(body, BreweryController.newBrewerySchema);

        const [city] = yield _models2.default.City.findOrCreate({ where: { name: body.city } });

        const brewery = yield _models2.default.Brewery.create((0, _extends3.default)({}, body, { cityId: city.id }));

        const tags = [];
        if (body.tags) {
          for (const tagName of body.tags) {
            const [tag] = yield _models2.default.Tag.findOrCreate({ where: { name: tagName } });
            const [breweryTag] = yield _models2.default.BreweryTag.findOrCreate({
              where: { breweryId: brewery.id, tagId: tag.id }
            });

            tags.push((0, _extends3.default)({}, breweryTag.dataValues, { tag: tag.dataValues }));
          }
        }

        res.status(201).send({
          newBrewery: (0, _extends3.default)({}, brewery.dataValues, { tags, city })
        });
      } catch (err) {
        return next(err);
      }
    })();
  }

}
exports.default = BreweryController;
BreweryController.newBrewerySchema = _joi2.default.object().keys({
  name: _joi2.default.string().required(),
  bannerUrl: _joi2.default.string().required(),
  websiteUrl: _joi2.default.string().required(),
  logoUrl: _joi2.default.string().required(),
  city: _joi2.default.string().required(),
  tags: _joi2.default.array().items(_joi2.default.string())
});
BreweryController.updateBrewerySchema = _joi2.default.object().keys({
  name: _joi2.default.string(),
  bannerUrl: _joi2.default.string(),
  websiteUrl: _joi2.default.string(),
  logoUrl: _joi2.default.string()
});
BreweryController.singleBreweryEagerGraph = [{ model: _models2.default.Brew, as: 'brews', include: [{ model: _models2.default.BrewTag, as: 'tags', include: [{ model: _models2.default.Tag, as: 'tag' }] }] }, { model: _models2.default.City, as: 'city' }, { model: _models2.default.BreweryTag, as: 'tags', include: [{ model: _models2.default.Tag, as: 'tag' }] }, { model: _models2.default.Post, as: 'posts', include: [{ model: _models2.default.User, as: 'user', attributes: _models2.default.User.$publicScope }, { model: _models2.default.PostTag, as: 'tags', include: [{ model: _models2.default.Tag, as: 'tag' }] }] }];
BreweryController.multiBreweryEagerGraph = [{ model: _models2.default.City, as: 'city' }, { model: _models2.default.BreweryTag, as: 'tags', include: [{ model: _models2.default.Tag, as: 'tag' }] }];