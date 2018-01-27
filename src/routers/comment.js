import { Router } from 'express'

import { requireAuth } from '@/middleware'
import { CommentController } from '@/controllers'

const router = Router()

router.route('/')
  .get(CommentController.getComments)
  .post(requireAuth, CommentController.createComment)

router.route('/:id')
  .put(requireAuth, CommentController.updateComment)

export default router
