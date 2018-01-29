import models from '@/models'
import * as errors from '@/errors'

export default class CityController {

  static cityEagerGraph = [
    { model: models.Brewery, as: 'breweries' }
  ]

  static async getCities(req, res, next) {
    try {
      const cities = await models.City.findAll({
        include: CityController.cityEagerGraph
      })

      res.status(200).json(cities)
    } catch (err) { next(err) }
  }

  static async getCity(req, res, next) {
    const { slug } = req.params

    try {
      const city = await models.City.findOne({
        where: { slug },
        include: CityController.cityEagerGraph,
      })
      if (!city) throw new errors.ModelNotFoundError('City')

      res.status(200).json(city)
    } catch (err) { next(err) }
  }

}
