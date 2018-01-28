'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _controllers = require('../controllers');

const router = (0, _express.Router)();

router.post('/login', _controllers.AuthController.login);

exports.default = router;