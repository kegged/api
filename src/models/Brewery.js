export default (sequelize, DataTypes) => {
  const Brewery = sequelize.define('Brewery', {
    name: {
      type: DataTypes.STRING,
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
  })

  Brewery.associate = models => {
    Brewery.hasMany(models.Brew)
    Brewery.hasMany(models.BreweryTag)
    Brewery.hasMany(models.Post)
    Brewery.belongsTo(models.City)
  }

  return Brewery
}
