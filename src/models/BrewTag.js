export default (sequelize, DataTypes) => {
  const BrewTag = sequelize.define('BrewTag', {
    brewId: {
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
        fields: ['brewId', 'tagId']
      }
    ],
    classMethods: {
      associate(models) {
        BrewTag.hasOne(models.Tag)
        BrewTag.hasOne(models.Brew)
      }
    },
    tableName: 'brewTag'
  })

  return BrewTag
}
