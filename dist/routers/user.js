'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _middleware = require('../middleware');

var _controllers = require('../controllers');

const router = (0, _express.Router)();

router.route('/').get(_controllers.UserController.getUsers).post(_controllers.UserController.createUser);

router.route('/:userName').get(_controllers.UserController.getUser).put(_middleware.requireAuth, _controllers.UserController.updateUser).delete(_middleware.requireAuth, _controllers.UserController.deleteUser);

router.get('/email/:slug', _controllers.UserController.getUserByEmail);

exports.default = router;