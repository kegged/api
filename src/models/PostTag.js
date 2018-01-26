export default (sequelize, DataTypes) => {
  const PostTag = sequelize.define('PostTag', { tagId: DataTypes.INTEGER }, {
    indexes: [
      {
        unique: true,
        fields: ['postId', 'tagId']
      }
    ]
  })

  PostTag.associate = models => {
    PostTag.belongsTo(models.Post, {
      foreignKey: 'postId',
      as: 'post',
    })
    PostTag.belongsTo(models.Tag, {
      foreignKey: 'tagId',
      as: 'tag',
    })
  }

  return PostTag
}
