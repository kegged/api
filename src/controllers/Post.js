import joi from 'joi'

import models from '@/models'
import * as errors from '@/errors'

export default class PostController {

  static newPostSchema = joi.object().keys({
    title: joi.string().required(),
    content: joi.string().required(),
    userId: joi.number(),
    breweryId: joi.number(),
    tags: joi.array().items(joi.string()),
  })

  static updatePostSchema = joi.object().keys({
    title: joi.string(),
    content: joi.string(),
    breweryId: joi.number(),
  })

  static singleBrewerySortGraph = [
    [ { model: models.Comment, as: 'comments' }, 'createdAt', 'DESC' ]
  ]

  static singlePostEagerGraph = [
    { model: models.Brewery, as: 'brewery', include: [
      { model: models.City, as: 'city' }
    ] },
    { model: models.PostTag, as: 'tags', include: [
      { model: models.Tag, as: 'tag' }
    ] },
    { model: models.User, as: 'user', attributes: models.User.$publicScope },
    { model: models.Comment, as: 'comments', include: [
      { model: models.User, as: 'user', attributes: models.User.$publicScope }
    ] }
  ]

  static multiPostEagerGraph = [
    { model: models.User, as: 'user', attributes: models.User.$publicScope },
    { model: models.Brewery, as: 'brewery' },
  ]

  static async getPosts(req, res, next) {
    const posts = await models.Post.findAll({
      include: PostController.multiPostEagerGraph,
    })

    res.status(200).json(posts)
  }

  static async getPost(req, res, next) {
    const { slug } = req.params

    const post = await models.Post.findOne({
      where: { slug },
      include: PostController.singlePostEagerGraph,
      order: PostController.singleBrewerySortGraph,
    })
    if (!post) return next(new errors.ModelNotFoundError('Post'))

    res.status(200).json({ post })
  }

  static async createPost(req, res, next) {
    const { body } = req
    const { isAdmin, id } = req.user
    
    try {
      joi.assert(body, PostController.newPostSchema)

      if (typeof body.userId !== 'number') {
        body.userId = id
      } else if (!isAdmin && id !== body.userId) {
        throw new errors.UnauthorizedError()
      }

      const post = await models.Post.create(req.body)

      const tags = []
      if (body.tags) {
        for (const tagName of body.tags) {
          const [tag] = await models.Tag.findOrCreate({ where: { name: tagName } })
          const [postTag] = await models.PostTag.findOrCreate({
            where: { postId: post.id, tagId: tag.id }
          })

          tags.push({ ...postTag.dataValues, tag: tag.dataValues })
        }
      }

      res.status(201).send({
        newPost: { ...post.dataValues, tags }
      })
      
    } catch (err) { next(err) }
  }

  static async updatePost(req, res, next) {
    const { body, user } = req
    const { slug } = req.params

    try {
      joi.assert(body, PostController.updatePostSchema)
    } catch (err) { return next(err) }

    const post = models.Post.findOne({ where: { slug } })
    if (!post) return next(new errors.ModelNotFoundError('Post'))

    if (!user.isAdmin && post.id !== user.id) {
      return next(new errors.UnauthorizedError())
    }

    try {
      const updatedPost = await models.Post.updateAttributes(req.body)
      res.status(200).json({ updatedPost })
    } catch (err) { next(err) }
  }

}
