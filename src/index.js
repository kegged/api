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

const app = express()

app
  .disable('x-powered-by')
  .disable('etag')

app
  .use(morgan(!PROD ? 'dev' : 'combined'))
  .use(compression())
  .use(helmet())
  .use(jsonParser())

app.use('/', routers.mainRouter)
app.use('/users', routers.userRouter)

app.get('/secret', middleware.requireAuth, (req, res) => res.send(req.user))

app.listen(PORT || 3000)

export default app
