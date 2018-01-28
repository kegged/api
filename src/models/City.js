import slugify from 'sequelize-slugify'

export default (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    }
  })

  slugify.slugifyModel(City, {
    source: ['name']
  })

  City.associate = models => {
    City.hasMany(models.Brewery, {
      foreignKey: 'cityId',
      as: 'breweries',
      allowNull: false,
    })
  }
  
  return City
}
