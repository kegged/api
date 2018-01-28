'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _middleware = require('../middleware');

var _controllers = require('../controllers');

const router = (0, _express.Router)();

router.route('/').get(_controllers.PostController.getPosts).post(_middleware.requireAuth, _controllers.PostController.createPost);

router.route('/:slug').get(_controllers.PostController.getPost).put(_middleware.requireAuth, _controllers.PostController.updatePost);

exports.default = router;