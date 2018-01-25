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
    Brew.hasMany(models.BrewTag)
  }

  return Brew
}
