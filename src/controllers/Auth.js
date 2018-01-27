import models from '@/models'
import * as errors from '@/errors'

export default class AuthController {

  static async login(req, res, next) {
    const { userName, passWord } = req.body

    // resolve user by userName
    const user = await models.User.findOne({ where: { userName } })
    if (!user) return next(new errors.ModelNotFoundError('user'))

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
