import joi from 'joi'

import models from '@/models'
import * as errors from '@/errors'

export default class BrewController {

  static newBrewSchema = joi.object().keys({
    name: joi.string().required(),
    photoUrl: joi.string().required(),
    breweryId: joi.number().required(),
    style: joi.string().required(),
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
    ] },
    { model: models.BrewStyle, as: 'style', include: [
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
    const { city, brewery, slug } = req.params

    try {
      const $city = await models.City.findOne({ where: { slug: city } })
      if (!$city) throw new errors.ModelNotFoundError('City')

      const $brewery = await models.Brewery.findOne({
        where: { slug: brewery, cityId: $city.id }
      })
      if (!$brewery) throw new errors.ModelNotFoundError('Brewery')

      const brew = await models.Brew.findOne({
        where: { slug, breweryId: $brewery.id },
        include: BrewController.brewEagerGraph
      })
      if (!brew) throw new errors.ModelNotFoundError('Brew')

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

      const [styleTag] = await models.Tag.findOrCreate({ where: { name: body.style } })
      const [brewStyle] = await models.BrewStyle.findOrCreate({
        where: { brewId: brew.id, tagId: styleTag.id }
      })

      const tags = []
      if (body.tags) {
        for (const tagName of body.tags) {
          const [tag] = await models.Tag.findOrCreate({ where: { name: tagName } })
          const [brewTag] = await models.BrewTag.findOrCreate({
            where: { brewId: brew.id, tagId: tag.id }
          })

          tags.push({ ...brewTag.dataValues, tag: tag.dataValues })
        }
      }

      res.status(201).send({
        newBrew: {
          ...brew.dataValues,
          brewery: brewery.dataValues,
          style: { ...brewStyle.dataValues, tag: styleTag.dataValues },
          tags,
        }
      })
    } catch (err) { next(err) }
  }

  static async updateBrew(req, res, next) {
    const { body, params } = req
    const { city, brewery, slug } = params

    try {
      joi.assert(body, BrewController.updateBrewSchema)

      const $city = await models.City.findOne({ where: { slug: city } })
      if (!$city) throw new errors.ModelNotFoundError('City')

      const $brewery = await models.Brewery.findOne({
        where: { slug: brewery, cityId: $city.id }
      })
      if (!$brewery) throw new errors.ModelNotFoundError('Brewery')

      const brew = await models.Brew.findOne({
        where: { slug, breweryId: $brewery.id },
      })
      if (!brew) throw new errors.ModelNotFoundError('Brew')

      await brew.updateAttributes(body)

      res.status(200).json({ updatedBrew: brew })
    } catch (err) { next(err) }
  }

}
