export default (sequelize, DataTypes) => {
  const Brew = sequelize.define('Brew', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photoUrl: {
      type: DataTypes.STRING,
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['name', 'breweryId']
      }
    ]
  })

  Brew.associate = models => {
    Brew.belongsTo(models.Brewery, {
      foreignKey: 'breweryId',
      as: 'brewery',
    })
    Brew.hasMany(models.BrewTag, {
      foreignKey: 'brewId',
      as: 'tags',
    })
  }

  return Brew
}
