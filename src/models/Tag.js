export default (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    }
  })

  Tag.associate = models => {
    Tag.hasMany(models.PostTag, {
      foreignKey: 'tagId'
    })
    Tag.hasMany(models.BrewTag, {
      foreignKey: 'tagId'
    })
    Tag.hasMany(models.BreweryTag, {
      foreignKey: 'tagId'
    })
    Tag.hasMany(models.BrewStyle, {
      foreignKey: 'tagId'
    })
  }
  
  return Tag
}
