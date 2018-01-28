'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _controllers = require('../controllers');

const router = (0, _express.Router)();

router.route('/').post(_controllers.BreweryController.createBrewery).get(_controllers.BreweryController.getBreweries);

router.route('/:city/:slug').get(_controllers.BreweryController.getBrewery);

exports.default = router;