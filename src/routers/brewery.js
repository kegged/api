import { Router } from 'express'

import { BreweryController } from '@/controllers'

const router = Router()

router.route('/')
  .get(BreweryController.getBreweries)


export default router
