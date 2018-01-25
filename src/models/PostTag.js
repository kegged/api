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
    // PostTag.hasOne(models.Post)
    PostTag.hasOne(models.Tag)
  }

  return PostTag
}
