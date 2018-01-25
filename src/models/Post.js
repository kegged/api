export default (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  })

  Post.associate = models => {
    Post.hasMany(models.PostTag)
    Post.hasMany(models.Comment)
    Post.belongsTo(models.Brewery, {
      foreignKey: 'breweryId',
      as: 'brewery',
    })
  }

  return Post
}
