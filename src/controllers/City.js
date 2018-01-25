import models from '@/models'

export default class CityController {

  static async getCities(req, res) {
    console.dir(models)
    const cities = await models.City.findAll({ include: [ models.Brewery ] })
    res.status(200).json(cities)
  }

}
