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
    BrewTag.belongsTo(models.Tag, {
      foreignKey: 'tagId',
      as: 'tag',
    })
    BrewTag.belongsTo(models.Brew, {
      foreignKey: 'brewId',
      as: 'brew',
    })
  }

  return BrewTag
}
