import './config/env'

import express from 'express'
import compression from 'compression'
import { json as jsonParser } from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

import * as routers from './routers'
import * as middleware from './middleware'

const { NODE_ENV, PORT } = process.env
const PROD = NODE_ENV === 'production'
const TEST = NODE_ENV === 'test'

const app = express()

// disable headers
app
  .disable('x-powered-by')
  .disable('etag')

// mount vendor middleware
app
  .use(compression())
  .use(helmet())
  .use(jsonParser())

if (!TEST) {
  // disable logger durring tests
  app.use(morgan(!PROD ? 'dev' : 'combined'))
}

// mount routers
app.use('/', routers.mainRouter)
app.use('/users', routers.userRouter)

app.get('/secret', middleware.requireAuth, (req, res) => res.send(req.user))

// mount error middleware
app.use(middleware.notFound)
app.use(middleware.errorHandler)

export const server = app.listen(PORT || 3000)

export default app
