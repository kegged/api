export default (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    }
  })

  City.associate = models => {
    City.hasMany(models.Brewery, {
      foreignKey: 'cityId',
      as: 'breweries',
    })
  }
  
  return City
}