'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _middleware = require('../middleware');

var _controllers = require('../controllers');

const router = (0, _express.Router)();

router.route('/').get(_controllers.CommentController.getComments).post(_middleware.requireAuth, _controllers.CommentController.createComment);

router.route('/:id').put(_middleware.requireAuth, _controllers.CommentController.updateComment);

exports.default = router;