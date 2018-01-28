'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeSlugify = require('sequelize-slugify');

var _sequelizeSlugify2 = _interopRequireDefault(_sequelizeSlugify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      unique: true
    }
  });

  _sequelizeSlugify2.default.slugifyModel(City, {
    source: ['name']
  });

  City.associate = models => {
    City.hasMany(models.Brewery, {
      foreignKey: 'cityId',
      as: 'breweries',
      allowNull: false
    });
  };

  return City;
};