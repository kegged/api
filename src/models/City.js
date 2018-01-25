export default (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    }
  }, {
    tableName: 'city',
    classMethods: {
      associate(models) {
        City.hasMany(models.Brewery)
      }
    },
  })
  
  return City
}
