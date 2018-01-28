'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelizeSlugify = require('sequelize-slugify');

var _sequelizeSlugify2 = _interopRequireDefault(_sequelizeSlugify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (sequelize, DataTypes) => {
  const Brew = sequelize.define('Brew', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING
    },
    photoUrl: {
      type: DataTypes.STRING
    }
  }, {
    indexes: [{
      unique: true,
      fields: ['name', 'slug', 'breweryId']
    }]
  });

  _sequelizeSlugify2.default.slugifyModel(Brew, {
    source: ['name']
  });

  Brew.associate = models => {
    Brew.belongsTo(models.Brewery, {
      foreignKey: 'breweryId',
      as: 'brewery'
    });
    Brew.hasMany(models.BrewTag, {
      foreignKey: 'brewId',
      as: 'tags'
    });
  };

  return Brew;
};