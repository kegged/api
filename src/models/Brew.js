export default (sequelize, DataTypes) => {
  const Brew = sequelize.define('Brew', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breweryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['name', 'breweryId']
      }
    ],
    tableName: 'brew',
    classMethods: {
      associate(models) {
        Brew.hasMany(models.BrewTag)
      }
    },
  })

  return Brew
}
