'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = undefined;

require('./config/env');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _bodyParser = require('body-parser');

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _routers = require('./routers');

var routers = _interopRequireWildcard(_routers);

var _middleware = require('./middleware');

var middleware = _interopRequireWildcard(_middleware);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { NODE_ENV, PORT } = process.env;
const PROD = NODE_ENV === 'production';
const TEST = NODE_ENV === 'test';

const app = (0, _express2.default)();

// disable headers
app.disable('x-powered-by').disable('etag');

// mount vendor middleware
app.use((0, _compression2.default)()).use((0, _helmet2.default)()).use((0, _bodyParser.json)());

if (!TEST) {
  // disable logger durring tests
  app.use((0, _morgan2.default)(!PROD ? 'dev' : 'combined'));
}

// mount routers
app.use('/', routers.mainRouter).use('/brews', routers.brewRouter).use('/comments', routers.commentRouter).use('/posts', routers.postRouter).use('/breweries', routers.breweryRouter).use('/cities', routers.cityRouter).use('/users', routers.userRouter);

app.get('/secret', middleware.requireAuth, (req, res) => res.send(req.user));

// mount error middleware
app.use(middleware.notFound).use(middleware.errorWrapper).use(middleware.errorHandler);

const server = exports.server = app.listen(PORT || 3000);

exports.default = app;