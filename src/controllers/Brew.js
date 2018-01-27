import joi from 'joi'

import models from '@/models'
import * as errors from '@/errors'

export default class BrewController {

  static newBrewSchema = joi.object().keys({
    name: joi.string().required(),
    photoUrl: joi.string().required(),
    breweryId: joi.number().required(),
    tags: joi.array().items(joi.string())
  })

  static updateBrewSchema = joi.object().keys({
    name: joi.string(),
    photoUrl: joi.string(),
  })

  static brewEagerGraph = [
    { model: models.Brewery, as: 'brewery', include: [
      { model: models.City, as: 'city' }
    ] },
    { model: models.BrewTag, as: 'tags', include: [
      { model: models.Tag, as: 'tag' }
    ] }
  ]

  static async getBrews(req, res, next) {
    try {
      const brews = await models.Brew.findAll({
        include: BrewController.brewEagerGraph
      })
      res.status(200).json(brews)
    } catch (err) { next(err) }
  }

  static async getBrew(req, res, next) {
    const { city, brewery, name } = req.params

    try {
      const $city = await models.City.findOne({ name: city })
      if (!$city) throw new errors.ModelNotFoundError('City')

      const $brewery = await models.Brewery.findOne({
        name: brewery, cityId: $city.id,
      })
      if (!$brewery) throw new errors.ModelNotFoundError('Brewery')

      const brew = await models.Brew.findOne({
        name,
        breweryId: $brewery.id,
        include: BrewController.brewEagerGraph
      })

      res.status(200).json(brew)
    } catch (err) { next(err) }
  }

  static async createBrew(req, res, next) {
    const { body } = req

    try {
      joi.assert(body, BrewController.newBrewSchema)

      const brewery = await models.Brewery.findById(body.breweryId)
      if (!brewery) throw new errors.ModelNotFoundError('Brewery')

      const brew = await models.Brew.create(body)

      const tags = []
      for (const tagName of body.tags) {
        const [tag] = await models.Tag.findOrCreate({ where: { name: tagName } })
        const [brewTag] = await models.BrewTag.findOrCreate({
          where: { brewId: brew.id, tagId: tag.id }
        })

        tags.push({ ...brewTag.dataValues, tag: tag.dataValues })
      }

      res.status(201).send({
        newBrew: { ...brew.dataValues, tags, brewery: brewery.dataValues }
      })
    } catch (err) { next(err) }
  }

}