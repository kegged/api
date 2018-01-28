'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeSlugify = require('sequelize-slugify');

var _sequelizeSlugify2 = _interopRequireDefault(_sequelizeSlugify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (sequelize, DataTypes) => {
  const Brewery = sequelize.define('Brewery', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING
    },
    bannerUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    websiteUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    logoUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    indexes: [{
      unique: true,
      fields: ['name', 'slug', 'cityId']
    }]
  });

  _sequelizeSlugify2.default.slugifyModel(Brewery, {
    source: ['name']
  });

  Brewery.associate = models => {
    Brewery.hasMany(models.Brew, {
      foreignKey: 'breweryId',
      as: 'brews'
    });
    Brewery.hasMany(models.BreweryTag, {
      foreignKey: 'breweryId',
      as: 'tags'
    });
    Brewery.hasMany(models.Post, {
      foreignKey: 'breweryId',
      as: 'posts'
    });
    Brewery.belongsTo(models.City, {
      foreignKey: 'cityId',
      as: 'city',
      allowNull: false
    });
  };

  return Brewery;
};