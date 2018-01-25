import { Router } from 'express'
import { CityController } from '@/controllers'

const router = Router()

router.route('/')
  .get(CityController.getCities)

export default router
