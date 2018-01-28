import slugify from 'sequelize-slugify'

export default (sequelize, DataTypes) => {
  const Brewery = sequelize.define('Brewery', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
    },
    bannerUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    websiteUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['name', 'slug', 'cityId']
      }
    ],
  })

  slugify.slugifyModel(Brewery, {
    source: ['name']
  })

  Brewery.associate = models => {
    Brewery.hasMany(models.Brew, {
      foreignKey: 'breweryId',
      as: 'brews',
    })
    Brewery.hasMany(models.BreweryTag, {
      foreignKey: 'breweryId',
      as: 'tags',
    })
    Brewery.hasMany(models.Post, {
      foreignKey: 'breweryId',
      as: 'posts',
    })
    Brewery.belongsTo(models.City, {
      foreignKey: 'cityId',
      as: 'city',
      allowNull: false,
    })
  }

  return Brewery
}
