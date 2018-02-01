import joi from 'joi'

import models from '@/models'
import * as errors from '@/errors'
import { generateHash } from '@/utils'

export default class UserController {

  static publicAttributes = [
    'id', 'userName', 'firstName', 'lastName', 'email'
  ]

  static newUserSchema = joi.object().keys({
    email: joi.string().email().required(),
    userName: joi.string().alphanum().min(3).max(20).required(),
    passWord: joi.string().min(8).max(20).required(),
    firstName: joi.string().max(50).required(),
    lastName: joi.string().max(50).required(),
  })

  static updateUserSchema = joi.object().keys({
    email: joi.string().email(),
    userName: joi.string().alphanum().min(3).max(20),
    passWord: joi.string().min(8).max(20),
    firstName: joi.string().max(50),
    lastName: joi.string().max(50),
  })

  static userSortGraph = [
    [ { model: models.Post, as: 'posts' }, 'createdAt', 'DESC' ],
    [ { model: models.Comment, as: 'comments' }, 'createdAt', 'DESC' ]
  ]

  static userEagerGraph = [
    { model: models.Post, as: 'posts', include: [
      { model: models.Brewery, as: 'brewery' }
    ] },
    { model: models.Comment, as: 'comments', include: [
      { model: models.Post, as: 'post', include: [
        { model: models.Brewery, as: 'brewery', include: [
          { model: models.City, as: 'city' }
        ] },
        { model: models.PostTag, as: 'tags', include: [
          { model: models.Tag, as: 'tag' }
        ] }
      ] }
    ] }
  ]

  static async createUser(req, res, next) {
    const { body } = req

    try {
      joi.assert(body, UserController.newUserSchema)
    
      const { hash, salt } = await generateHash(body.passWord)
    
      const newUser = await models.User.create({
        ...body, hash, salt
      })

      const token = await newUser.generateToken()
  
      res.status(201).json({ newUser, token })
    } catch (err) { next(err) }
  }

  static async updateUser(req, res, next) {
    const { body, params } = req

    try {
      joi.assert(body, UserController.updateUserSchema)

      if (req.user.userName !== params.userName && !req.user.isAdmin) {
        throw new errors.UnauthorizedError()
      }

      const user = await models.User.findOne({
        where: { userName: params.userName }
      })
      if (!user) throw new errors.ModelNotFoundError('User')

      if (typeof body.passWord === 'string') {
        const { salt, hash } = await generateHash(body.passWord)
        body.salt = salt
        body.hash = hash
      }

      await user.updateAttributes(body)
      console.log('username', user.userName)

      res.status(200).json({ updatedUser: user })
    } catch (err) { next(err) }
  }

  static async deleteUser(req, res, next) {
    const { userName } = req.params

    try {
      const user = await models.User.findOne({ where: { userName } })
      if (!user) throw new errors.ModelNotFoundError('User')

      if (req.user.userName !== userName && !req.user.isAdmin) {
        throw new errors.UnauthorizedError()
      }

      await models.User.destroy({ where: { userName } })

      res.status(200).json({ deletedUser: user })
    } catch (err) { next(err) }
  }

  static async getUser(req, res, next) {
    const { userName } = req.params

    try {
      const user = await models.User.findOne({
        where: { userName },
        attributes: models.User.$publicScope,
        include: UserController.userEagerGraph,
        order: UserController.userSortGraph,
      })
      if (!user) throw new errors.ModelNotFoundError('User')

      res.status(200).json({ user })
    } catch (err) { next(err) }
  }

  static async getUsers(req, res, next) {
    try {
      const users = await models.User.findAll({ attributes: UserController.publicAttributes })
      res.status(200).send({ users })
    } catch (err) { next(err) }
  }

  static async getUserByEmail(req, res, next) {
    const { slug } = req.params

    try {
      if (!slug) throw new errors.ValidationError('Email is required')

      const user = await models.User.findOne({ where: { email: slug } })
      if (!user) throw new errors.ModelNotFoundError('User')

      res.status(200).json({ user })
    } catch (err) { next(err) }
  }

}
