import { Router } from 'express'
import { CityController } from '@/controllers'

import breweryRouter from './brewery'

const router = Router()

router.route('/')
  .get(CityController.getCities)

router.use('/:city', breweryRouter)

export default router
