export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  })

  Comment.associate = models => {
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      allowNull: false,
    })
    Comment.belongsTo(models.Post, {
      foreignKey: 'postId',
      as: 'post',
      allowNull: false,
    })
  }

  return Comment
}
