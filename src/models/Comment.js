export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        Post.hasMany(models.Comment)
      }
    }
  })

  return Comment
}
