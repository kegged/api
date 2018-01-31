import { Router } from 'express'

import { requireAuth } from '@/middleware'
import { UserController } from '@/controllers'

const router = Router()

router.route('/')
  .get(UserController.getUsers)
  .post(UserController.createUser)

router.route('/:userName')
  .get(UserController.getUser)
  .put(requireAuth, UserController.updateUser)
  .delete(requireAuth, UserController.deleteUser)

router.get('/email/:slug', UserController.getUserByEmail)

export default router
