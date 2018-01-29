import slugify from 'sequelize-slugify'

export default (sequelize, DataTypes) => {
  const Brew = sequelize.define('Brew', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
    },
    photoUrl: {
      type: DataTypes.STRING,
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['name', 'slug', 'breweryId']
      }
    ]
  })

  slugify.slugifyModel(Brew, {
    source: ['name']
  })

  Brew.associate = models => {
    Brew.belongsTo(models.Brewery, {
      allowNull: false,
      foreignKey: 'breweryId',
      as: 'brewery',
    })
    Brew.hasMany(models.BrewTag, {
      foreignKey: 'brewId',
      as: 'tags',
    })
    Brew.hasOne(models.BrewStyle, {
      allowNull: false,
      foreignKey: 'brewId',
      as: 'style',
    })
  }

  return Brew
}
