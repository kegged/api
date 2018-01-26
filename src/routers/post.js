import { Router } from 'express'

import { requireAuth } from '@/middleware'
import { PostController } from '@/controllers'

const router = Router()

router.route('/')
  .get(PostController.getPosts)
  .post(requireAuth, PostController.createPost)

router.route('/:id/:title')
  .get(PostController.getPost)
  .put(requireAuth, PostController.updatePost)

export default router
