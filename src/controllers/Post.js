import joi from 'joi'

import models from '@/models'
import * as errors from '@/errors'

export default class PostController {

  static newPostSchema = joi.object().keys({
    title: joi.string().required(),
    content: joi.string().required(),
    userId: joi.number(),
    breweryId: joi.number(),
  })

  static updatePostSchema = joi.object().keys({
    title: joi.string(),
    content: joi.string(),
    breweryId: joi.number(),
  })

  static singlePostEagerGraph = [
    { model: models.Brewery, as: 'brewery' },
    { model: models.PostTag, as: 'tags', include: [
      { model: models.Tag, as: 'tag' }
    ] },
    { model: models.User, as: 'user', fields: [
      // TODO: mk models.User.$publicScope
      'userName', 'firstName', 'lastName', 'email', 'id'
    ] },
    { model: models.Comment, as: 'comments', include: [
      { model: models.User, as: 'user', fields: [
        'userName', 'firstName', 'lastName', 'email', 'id'
      ] }
    ] }
  ]

  static async getPosts(req, res) {
    const posts = await models.Post.findAll({
      include: [
        { model: models.User, as: 'user' },
        { model: models.Brewery, as: 'brewery' },
      ]
    })

    res.status(200).json(posts)
  }

  static async getPost(req, res) {
    const { id, title } = req.params

    const post = await models.Post.findOne({
      where: { id, title },
      include: PostController.singlePostEagerGraph,
    })
    if (!post) return next(new errors.ModelNotFoundError('Post'))

    res.status(200).json({ post })
  }

  static async createPost(req, res, next) {
    const { body } = req

    try {
      joi.assert(body, PostController.newPostSchema)
    } catch (err) { return next(err) }

    const { isAdmin, id } = req.user

    if (typeof body.userId !== 'number') {
      body.userId = req.user.id
    } else if (!isAdmin && id !== body.userId) {
      return next(new errors.UnauthorizedError())
    }

    try {
      const newPost = await models.Post.create(req.body)
      res.status(201).json({ newPost })
    } catch (err) { next(err) }
  }

  static async updatePost(req, res, next) {
    const { body, user } = req
    const { id, title } = req.params

    try {
      joi.assert(body, PostController.updatePostSchema)
    } catch (err) { return next(err) }

    const post = models.Post.findOne({ where: { id, title } })
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
