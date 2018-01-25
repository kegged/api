export default (sequelize, DataTypes) => {
  const Brew = sequelize.define('Brew', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    Brew.hasMany(models.BrewTag)
  }

  return Brew
}
