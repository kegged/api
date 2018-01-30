'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _middleware = require('../middleware');

var _controllers = require('../controllers');

const router = (0, _express.Router)();

router.route('/').post(_middleware.requireAdmin, _controllers.BrewController.createBrew).get(_controllers.BrewController.getBrews);

router.route('/:city/:brewery/:slug').get(_controllers.BrewController.getBrew).put(_middleware.requireAdmin, _controllers.BrewController.updateBrew);

exports.default = router;