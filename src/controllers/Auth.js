import models from '@/models'

export default class AuthController {

  static async login(req, res, next) {
    const { userName, passWord } = req.body

    // resolve user by userName
    const user = await models.User.findOne({ where: { userName } })
    if (!user) {
      const err = new Error('user does not exist')
      err.status = 404
      return next(err)
    }

    const isMatch = await user.checkPassword(passWord)
    if (!isMatch) {
      const err = new Error('incorrect password')
      err.status = 401
      return next(err)
    }

    const token = await user.generateToken()

    res.status(200).json({ token })
  }

}
