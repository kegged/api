import { Router } from 'express'

import { BreweryController } from '@/controllers'

const router = Router()

router.route('/')
  .get(BreweryController.getBreweries)

// router.route('/:city')
//   .get(BreweryController.getBreweries)


export default router
