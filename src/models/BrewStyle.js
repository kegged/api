export default (sequelize, DataTypes) => {
  const BrewStyle = sequelize.define('BrewStyle', {}, {
    indexs: [
      {
        unique: true,
        fields: ['brewId', 'tagId']
      }
    ]
  })

  BrewStyle.associate = models => {
    BrewStyle.belongsTo(models.Brew, {
      foreignKey: 'brewId',
      as: 'brew',
      allowNull: false,
    })
    BrewStyle.belongsTo(models.Tag, {
      foreignKey: 'tagId',
      as: 'tag',
      allowNull: false,
    })
  }

  return BrewStyle
}
