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
    // BreweryTag.hasOne(models.Tag)
    // BreweryTag.hasOne(models.Brewery)
  }

  return BreweryTag
}
