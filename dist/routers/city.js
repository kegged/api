'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _controllers = require('../controllers');

const router = (0, _express.Router)();

router.route('/').get(_controllers.CityController.getCities);

router.route('/:slug').get(_controllers.CityController.getCity);

exports.default = router;