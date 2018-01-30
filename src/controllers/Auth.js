import models from '@/models'
import * as errors from '@/errors'

export default class AuthController {

  static async login(req, res, next) {
    const { userName, passWord } = req.body

    try {    
      const user = await models.User.findOne({ where: { userName } })
      if (!user) throw new errors.ModelNotFoundError('User')

      const isMatch = await user.checkPassword(passWord)
      if (!isMatch) throw new errors.UnauthorizedError()

      const token = await user.generateToken()

      const $user = user.dataValues;
      ['hash', 'salt', 'isAdmin'].forEach(key => delete $user[key])

      res.status(200).json({ token, user: $user })
    } catch (err) { next(err) }
  }

}
