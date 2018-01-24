import models from '@/models'
import { generateHash } from '@/utils'

export default class UserController {

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

}
