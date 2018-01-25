import models from '@/models'

export default class BreweryController {

  static async getBreweries(req, res, next) {
    console.log('params => ', req.params)
    const city = await models.City.findOne({
      where: { name: 'Raleigh' },
      include: [ { model: models.Brewery } ],
    })

    if (!city) {
      const err = new Error()
      err.status = 404
      return next(err)
    }

    res.status(200).json(city)
  }

}
