import { Router } from 'express'
import { CityController } from '@/controllers'

const router = Router()

router.route('/')
  .get(CityController.getCities)

router.route('/:slug')
  .get(CityController.getCity)

export default router
