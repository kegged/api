'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

class PostController {

  static getPosts(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      const posts = yield _models2.default.Post.findAll({
        include: PostController.multiPostEagerGraph
      });

      res.status(200).json(posts);
    })();
  }

  static getPost(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      const { slug } = req.params;

      const post = yield _models2.default.Post.findOne({
        where: { slug },
        include: PostController.singlePostEagerGraph,
        order: PostController.singleBrewerySortGraph
      });
      if (!post) return next(new errors.ModelNotFoundError('Post'));

      res.status(200).json({ post });
    })();
  }

  static createPost(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      const { body } = req;
      const { isAdmin, id } = req.user;

      try {
        _joi2.default.assert(body, PostController.newPostSchema);

        if (typeof body.userId !== 'number') {
          body.userId = id;
        } else if (!isAdmin && id !== body.userId) {
          throw new errors.UnauthorizedError();
        }

        const post = yield _models2.default.Post.create(req.body);

        const tags = [];
        if (body.tags) {
          for (const tagName of body.tags) {
            const [tag] = yield _models2.default.Tag.findOrCreate({ where: { name: tagName } });
            const [postTag] = yield _models2.default.PostTag.findOrCreate({
              where: { postId: post.id, tagId: tag.id }
            });

            tags.push((0, _extends3.default)({}, postTag.dataValues, { tag: tag.dataValues }));
          }
        }

        res.status(201).send({
          newPost: (0, _extends3.default)({}, post.dataValues, { tags })
        });
      } catch (err) {
        next(err);
      }
    })();
  }

  static updatePost(req, res, next) {
    return (0, _asyncToGenerator3.default)(function* () {
      const { body, user } = req;
      const { slug } = req.params;

      try {
        _joi2.default.assert(body, PostController.updatePostSchema);
      } catch (err) {
        return next(err);
      }

      const post = _models2.default.Post.findOne({ where: { slug } });
      if (!post) return next(new errors.ModelNotFoundError('Post'));

      if (!user.isAdmin && post.id !== user.id) {
        return next(new errors.UnauthorizedError());
      }

      try {
        const updatedPost = yield _models2.default.Post.updateAttributes(req.body);
        res.status(200).json({ updatedPost });
      } catch (err) {
        next(err);
      }
    })();
  }

}
exports.default = PostController;
PostController.newPostSchema = _joi2.default.object().keys({
  title: _joi2.default.string().required(),
  content: _joi2.default.string().required(),
  userId: _joi2.default.number(),
  breweryId: _joi2.default.number(),
  tags: _joi2.default.array().items(_joi2.default.string())
});
PostController.updatePostSchema = _joi2.default.object().keys({
  title: _joi2.default.string(),
  content: _joi2.default.string(),
  breweryId: _joi2.default.number()
});
PostController.singleBrewerySortGraph = [[{ model: _models2.default.Comment, as: 'comments' }, 'updatedAt', 'DESC']];
PostController.singlePostEagerGraph = [{ model: _models2.default.Brewery, as: 'brewery' }, { model: _models2.default.PostTag, as: 'tags', include: [{ model: _models2.default.Tag, as: 'tag' }] }, { model: _models2.default.User, as: 'user', attributes: _models2.default.User.$publicScope }, { model: _models2.default.Comment, as: 'comments', include: [{ model: _models2.default.User, as: 'user', attributes: _models2.default.User.$publicScope }] }];
PostController.multiPostEagerGraph = [{ model: _models2.default.User, as: 'user', attributes: _models2.default.User.$publicScope }, { model: _models2.default.Brewery, as: 'brewery' }];