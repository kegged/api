import { Router } from 'express'

import { BreweryController } from '@/controllers'

const router = Router()

router.route('/')
  .post(BreweryController.createBrewery)
  .get(BreweryController.getBreweries)

router.route('/:city/:name')
  .get(BreweryController.getBrewery)

export default router
