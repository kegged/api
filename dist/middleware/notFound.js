'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = (req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
};