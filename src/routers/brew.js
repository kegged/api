import { Router } from 'express'

import { requireAdmin } from '@/middleware'
import { BrewController } from '@/controllers'

const router = Router()

router.route('/')
  .post(requireAdmin, BrewController.createBrew)
  .get(BrewController.getBrews)

router.route('/:city/:brewery/:slug')
  .get(BrewController.getBrew)
  .put(requireAdmin, BrewController.updateBrew)

export default router
