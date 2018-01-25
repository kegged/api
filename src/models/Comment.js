export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  })

  // Comment.associate = models => {
  //   Comment.hasOne(models.User)
  // }

  return Comment
}
