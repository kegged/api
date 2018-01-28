'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _errors = require('../errors');

var errors = _interopRequireWildcard(_errors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CommentController {

  static createComment(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      const { body, user } = req;

      try {
        _joi2.default.assert(body, CommentController.newCommentSchema);

        if (typeof body.userId !== 'number') {
          body.userId = user.id;
        } else if (!user.isAdmin && body.userId !== user.id) {
          throw new errors.UnauthorizedError();
        }

        const newComment = yield _models2.default.Comment.create(body);

        res.status(201).json({ newComment });
      } catch (err) {
        next(err);
      }
    })();
  }

  static updateComment(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      const { body, user } = req;
      const { id } = req.params;

      try {
        _joi2.default.assert(body, CommentController.updateCommentSchema);

        const comment = yield _models2.default.Comment.findById(id);

        if (!user.isAdmin && comment.userId !== user.id) {
          throw new errors.UnauthorizedError();
        }

        yield comment.updateAttributes(body);

        res.status(200).json({ updatedComment: comment });
      } catch (err) {
        next(err);
      }
    })();
  }

  static getComments(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      try {
        const comments = yield _models2.default.Comment.findAll();

        res.status(200).json(comments);
      } catch (err) {
        next(err);
      }
    })();
  }

}
exports.default = CommentController;
CommentController.newCommentSchema = _joi2.default.object().keys({
  content: _joi2.default.string().required(),
  postId: _joi2.default.number().required(),
  userId: _joi2.default.number()
});
CommentController.updateCommentSchema = _joi2.default.object().keys({
  content: _joi2.default.string()
});