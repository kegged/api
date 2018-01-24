import joi from 'joi'

import models from '@/models'
import { generateHash } from '@/utils'

export default class UserController {

  static userBufferSchema = joi.object().keys({
    userName: joi.string().alphanum().min(3).max(30),
    passWord: joi.string().min(8).max(20),
    email: joi.string().email(),
    firstName: joi.string().min(2).max(50),
    lastName: joi.string().min(2).max(50),
  })

  static async createUser(req, res, next) {
    // const result = joi.validate(req.body, UserController.userBufferSchema.required())
    // failed validation send throw bad request
    // if (!result.error) return next(result.error)
  
    const { hash, salt } = await generateHash(req.body.passWord)
    delete req.body.passWord
  
    const newUser = await models.User.create({
      ...req.body, hash, salt
    })
  
    const token = await newUser.generateToken()
  
    res.status(201).json({ newUser, token })
  }

}