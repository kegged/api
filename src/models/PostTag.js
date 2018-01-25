export default (sequelize, DataTypes) => {
  const PostTag = sequelize.define('PostTag', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['postId', 'tagId']
      }
    ],
    classMethods: {
      associate(models) {
        PostTag.hasOne(models.Post)
        PostTag.hasOne(models.Tag)
      }
    },
    tableName: 'breweryTag'
  })

  return PostTag
}
