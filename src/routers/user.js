import { Router } from 'express'

import { requireAuth } from '@/middleware'
import { UserController } from '@/controllers'

const router = Router()

router.post('/', UserController.createUser)

router.put('/:userName', requireAuth, UserController.updateUser)

export default router
