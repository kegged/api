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

  Post.defaultScope = {
    include: [ { all: true } ]
  }

  Post.associate = models => {
    Post.hasMany(models.PostTag, {
      foreignKey: 'postId',
      as: 'tags',
    })
    Post.hasMany(models.Comment, {
      foreignKey: 'postId',
      as: 'comments',
    })
    Post.belongsTo(models.Brewery, {
      foreignKey: 'breweryId',
      as: 'brewery',
      allowNull: true,
    })
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      allowNull: false,
    })
  }

  return Post
}
