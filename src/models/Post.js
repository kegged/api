import slugify from 'sequelize-slugify'

export default (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  })

  slugify.slugifyModel(Post, {
    source: ['title']
  })

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
