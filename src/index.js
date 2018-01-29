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
  .use(cors({ credentials: true, origin: true }))
  .use(compression())
  .use(helmet())
  .use(jsonParser())

if (!TEST) {
  // disable logger durring tests
  app.use(morgan(!PROD ? 'dev' : 'combined'))
}

// mount routers
app
  .use('/', routers.mainRouter)
  .use('/brews', routers.brewRouter)
  .use('/comments', routers.commentRouter)
  .use('/posts', routers.postRouter)
  .use('/breweries', routers.breweryRouter)
  .use('/cities', routers.cityRouter)
  .use('/users', routers.userRouter)

app.get('/secret', middleware.requireAuth, (req, res) => res.send(req.user))

// mount error middleware
app
  .use(middleware.notFound)
  .use(middleware.errorWrapper)
  .use(middleware.errorHandler)

export const server = app.listen(PORT || 3000)

export default app
