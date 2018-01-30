import joi from 'joi'

import models from '@/models'
import * as errors from '@/errors'

export default class BreweryController {

  static newBrewerySchema = joi.object().keys({
    name: joi.string().required(),
    bannerUrl: joi.string().required(),
    websiteUrl: joi.string().required(),
    logoUrl: joi.string().required(),
    city: joi.string().required(),
    tags: joi.array().items(joi.string())
  })

  static updateBrewerySchema = joi.object().keys({
    name: joi.string(),
    bannerUrl: joi.string(),
    websiteUrl: joi.string(),
    logoUrl: joi.string(),
  })

  static singleBreweryEagerGraph = [
    { model: models.Brew, as: 'brews', include: [
      { model: models.BrewTag, as: 'tags', include: [
        { model: models.Tag, as: 'tag' },
      ] },
      { model: models.BrewStyle, as: 'style', include: [
        { model: models.Tag, as: 'tag' }
      ] },
    ] },
    { model: models.City, as: 'city' },
    { model: models.BreweryTag, as: 'tags', include: [
      { model: models.Tag, as: 'tag'} 
    ] },
    { model: models.Post, as: 'posts', include: [
      { model: models.User, as: 'user', attributes: models.User.$publicScope },
      { model: models.PostTag, as: 'tags', include: [
        { model: models.Tag, as: 'tag' }
      ] }
    ] }
  ]

  static multiBreweryEagerGraph = [
    { model: models.City, as: 'city' },
    { model: models.BreweryTag, as: 'tags', include: [
      { model: models.Tag, as: 'tag' }
    ] }
  ]

  static async getBreweries(req, res, next) {
    const { include } = req.query
    const breweries = await models.Brewery.findAll({
      include: BreweryController.multiBreweryEagerGraph,
    })

    res.status(200).json(breweries)
  }

  static async getBrewery(req, res, next) {
    const { city, slug } = req.params

    const $city = await models.City.findOne({ where: { slug: city } })
    if (!$city) return next(new errors.ModelNotFoundError('City'))

    const brewery = await models.Brewery.findOne({
      where: { slug, cityId: $city.id },
      include: BreweryController.singleBreweryEagerGraph,
    })
    if (!brewery) return next(new errors.ModelNotFoundError('Brewery'))

    res.status(200).json(brewery)
  }

  static async createBrewery(req, res, next) {
    const { body } = req

    try {
      joi.assert(body, BreweryController.newBrewerySchema)

      const [city] = await models.City.findOrCreate({ where: { name: body.city } })
  
      const brewery = await models.Brewery.create({ ...body, cityId: city.id })

      const tags = []
      if (body.tags) {
        for (const tagName of body.tags) {
          const [tag] = await models.Tag.findOrCreate({ where: { name: tagName } })
          const [breweryTag] = await models.BreweryTag.findOrCreate({
            where: { breweryId: brewery.id, tagId: tag.id }
          })

          tags.push({ ...breweryTag.dataValues, tag: tag.dataValues })
        }
      }

      res.status(201).send({
        newBrewery: { ...brewery.dataValues, tags, city }
      })

    } catch (err) { return next(err) }
  }

  static async updateBrewery(req, res, next) {
    const { params, body } = req
    const { city, slug } = params

    try {    
      const $city = await models.City.findOne({ where: { slug: city } })
      if (!$city) return next(new errors.ModelNotFoundError('City'))

      const brewery = await models.Brewery.findOne({
        where: { slug, cityId: $city.id },
        include: BreweryController.singleBreweryEagerGraph,
      })
      if (!brewery) return next(new errors.ModelNotFoundError('Brewery'))

      await brewery.updateAttributes(body)

      res.status(200).send({
        updatedBrewery: brewery
      })
    } catch (err) { next(err) }
  }

}
