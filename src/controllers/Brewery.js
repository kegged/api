import models from '@/models'

export default class BreweryController {

  static async getBreweries(req, res, next) {
    const { include } = req.query
    const breweries = await models.Brewery.findAll({
      include: [
        { model: models.City, as: 'city' },
        { model: models.Post, as: 'posts' },
        { model: models.Brew, as: 'brews' },
        { model: models.BreweryTag, as: 'tags', include: [
          { model: models.Tag, as: 'tag' }
        ] }
      ],
    })

    res.status(200).json(breweries)
  }

  static async createBrewery(req, res, next) {
  
  }

  // static async getBreweriesInCity(req, res, next) {
  //   const city = await models.City.findOne({
  //     where: req
  //   })
  // }

  // static async getBreweryInCity(req, res, next) {
  //   const city = await models.City.findOne({
  //     where: 
  //   })
  // }

}
