import models from '@/models'
import { generateHash } from '@/utils'

export default class UserController {

  static async findUserOr404(userName) {
    const user = await models.User.findOne({ where: { userName } })
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
  
    const newUser = await models.User.create({
      ...fields, hash, salt
    })
  
    const token = await newUser.generateToken()
  
    res.status(201).json({ newUser, token })
  }

  static async updateUser(req, res, next) {
    const { userName } = req.params
    const { firstName, lastName, email, passWord } = req.body

    if (req.user.userName !== userName && !req.user.isAdmin) {
      // user is unauthorized
      const err = new Error('unauthorized')
      err.status = 401
      next(err)
    }

    // find user
    const { user, error } = await UserController.findUserOr404(userName)
    if (error) return next(error)

    // update columns if needed
    if (typeof req.body.userName !== 'undefined') {
      user.userName = req.body.userName
    }

    if (typeof firstName !== 'undefined') {
      user.firstName = firstName
    }

    if (typeof lastName !== 'undefined') {
      user.lastName = lastName
    }

    if (typeof email !== 'undefined') {
      user.email = email
    }

    if (typeof passWord !== 'undefined') {
      const { salt, hash } = generateHash(passWord)
      user.salt = salt
      user.hash = hash
    }

    try {
      await user.update()
    } catch (e) { next(new Error('failed at update')) }

    res.status(200).json({ updatedUser: user })
  }

}
