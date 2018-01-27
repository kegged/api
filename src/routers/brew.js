import { Router } from 'express'

import { BrewController } from '@/controllers'

const router = Router()

router.route('/')
  .post(BrewController.createBrew)
  .get(BrewController.getBrews)

router.route('/:city/:brewery/:name')
  .get(BrewController.getBrew)

export default router
