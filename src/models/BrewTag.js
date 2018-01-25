export default (sequelize, DataTypes) => {
  const BrewTag = sequelize.define('BrewTag', { tagId: DataTypes.INTEGER }, {
    indexes: [
      {
        unique: true,
        fields: ['brewId', 'tagId']
      }
    ],
  })

  BrewTag.associate = models => {
    BrewTag.hasOne(models.Tag)
    // BrewTag.hasOne(models.Brew)
  }

  return BrewTag
}
