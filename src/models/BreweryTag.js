export default (sequelize, DataTypes) => {
  const BreweryTag = sequelize.define('BreweryTag', { tagId: DataTypes.INTEGER }, {
    indexes: [
      {
        unique: true,
        fields: ['breweryId', 'tagId']
      }
    ],
  })

  BreweryTag.associate = models => {
    BreweryTag.belongsTo(models.Brewery, {
      foreignKey: 'breweryId',
      as: 'brewery',
    })
    BreweryTag.belongsTo(models.Tag, {
      foreignKey: 'tagId',
      as: 'tag',
    })
  }

  return BreweryTag
}
