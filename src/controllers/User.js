import models from '@/models'
import { generateHash } from '@/utils'

export default class UserController {

  static publicAttributes = [
    'id', 'userName', 'firstName', 'lastName', 'email'
  ]

  static async findUserOr404(userName, pub) {
    const user = await models.User.findOne({
      where: { userName },
      include: [
        { model: models.Post, as: 'posts' },
        { model: models.Comment, as: 'comments' },
      ],
      attributes: pub ? UserController.publicAttributes : undefined,
    })
    if (!user) {
      const err = new Error('user does not exist')
      err.status = 404
      return { user: null, error: err }
    }
    return { user }
  }

  static async createUser(req, res, next) {
    const { userName, firstName, lastName, email, passWord } = req.body

    const fields = { userName, firstName, lastName, email, passWord }
    if (!Object.values(fields).every(val => typeof val !== 'undefined')) {
      // all fields are required; throw bad request
      const err = new Error('Bad request')
      err.status = 400
      return next(err)
    }
  
    const { hash, salt } = await generateHash(passWord)
    delete fields.passWord
  
    try {
      const newUser = await models.User.create({
        ...fields, hash, salt
      })

      const token = await newUser.generateToken()
  
      res.status(201).json({ newUser, token })
    } catch (err) {
      return next(err)
    }
  }

  static async updateUser(req, res, next) {
    const { userName } = req.params
    const { firstName, lastName, email, passWord } = req.body

    if (req.user.userName !== userName && !req.user.isAdmin) {
      // user is unauthorized update
      const err = new Error('unauthorized')
      err.status = 401
      return next(err)
    }

    // find user
    const { user, error } = await UserController.findUserOr404(userName)
    if (error) return next(error)

    const buffer = req.body

    if (typeof buffer.passWord !== 'undefined') {
      const { salt, hash } = generateHash(passWord)
      buffer.salt = salt
      buffer.hash = hash
      delete buffer.passWord
    }

    try {
      await user.updateAttributes(buffer)
    } catch (e) { next(new Error('failed at update')) }

    res.status(200).json({ updatedUser: user })
  }

  static async deleteUser(req, res, next) {
    const { userName } = req.params

    if (req.user.userName !== userName && !req.user.isAdmin) {
      // user is unauthorized to delete
      const err = new Error('unauthorized')
      err.status = 401
      next(err)
    }

    const { user, error } = await UserController.findUserOr404(userName)
    if (error) return next(error)

    await models.User.destroy({ where: { userName } })

    res.status(200).json({ deletedUser: user })
  }

  static async getUser(req, res, next) {
    const { userName } = req.params

    const { user, error } = await UserController.findUserOr404(userName, true)
    return error ? next(error) : res.status(200).json({ user })
  }

  static async getUsers(req, res, next) {
    const users = await models.User.findAll({ attributes: UserController.publicAttributes })
    res.status(200).send({ users })
  }

}
