import Brew from './Brew'
import Tag from './Tag'

export default (sequelize, DataTypes) => {
  const Brewery = sequelize.define('Brewery', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bannerUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    websiteUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['name', 'cityId']
      }
    ],
    classMethods: {
      associate(models) {
        Brewery.hasMany(models.Brew)
        Brewery.hasMany(models.BreweryTag)
        Brewery.hasMany(models.Post)
      }
    },
    tableName: 'brewery'
  })

  return Brewery
}
