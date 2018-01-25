export default (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    }
  })

  Tag.assoicate = models => {
    Tag.belongsToMany(models.PostTag)
    Tag.belongsToMany(models.BrewTag)
    Tag.belongsToMany(models.BreweryTag)
  }

  return Tag
}
