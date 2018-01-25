export default (sequelize, DataTypes) => {
  const BreweryTag = sequelize.define('BreweryTag', {
    breweryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['breweryId', 'tagId']
      }
    ],
    classMethods: {
      associate(models) {
        BreweryTag.hasOne(models.Tag)
        BreweryTag.hasOne(models.Brewery)
      }
    },
    tableName: 'breweryTag'
  })

  return BreweryTag
}
