import joi from 'joi'

import models from '@/models'
import * as errors from '@/errors'

export default class CommentController {

  static newCommentSchema = joi.object().keys({
    content: joi.string().required(),
    postId: joi.number().required(),
    userId: joi.number()
  })

  static updateCommentSchema = joi.object().keys({
    content: joi.string()
  })

  static async createComment(req, res, next) {
    const { body, user } = req

    try {
      joi.assert(body, CommentController.newCommentSchema)

      if (typeof body.userId !== 'number') {
        body.userId = user.id
      } else if (!user.isAdmin && body.userId !== user.id) {
        throw new errors.UnauthorizedError()
      }

      const newComment = await models.Comment.create(body)

      res.status(201).json({ newComment })
    } catch (err) { next(err) }
  }

  static async updateComment(req, res, next) {
    const { body, user } = req
    const { id } = req.params

    try {
      joi.assert(body, CommentController.updateCommentSchema)

      const comment = await models.Comment.findById(id)

      if (!user.isAdmin && comment.userId !== user.id) {
        throw new errors.UnauthorizedError()
      }

      await comment.updateAttributes(body)

      res.status(200).json({ updatedComment: comment })
    } catch (err) { next(err) }
  }

  static async getComments(req, res, next) {
    try {
      const comments = await models.Comment.findAll()

      res.status(200).json(comments)
    } catch (err) { next(err) }
  }

}
