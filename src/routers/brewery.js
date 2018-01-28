import { Router } from 'express'

import { requireAdmin } from '@/middleware'
import { BreweryController } from '@/controllers'

const router = Router()

router.route('/')
  .post(requireAdmin, BreweryController.createBrewery)
  .get(BreweryController.getBreweries)

router.route('/:city/:slug')
  .get(BreweryController.getBrewery)

export default router
