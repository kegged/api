export default (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    }
  })

  City.defaultScope = {
    include: [ { all: true } ]
  }

  City.associate = models => {
    City.hasMany(models.Brewery, {
      foreignKey: 'cityId',
      as: 'breweries',
    })
  }
  
  return City
}
