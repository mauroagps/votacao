import express from 'express'
import morgan from 'morgan'
import parser from 'body-parser'
import cors from 'cors'
import { version } from '../package.json'
import router from 'express-slim-router'
import path from 'path'
import errorHandler from '@brunocarvalho/error-handler'

const app = express()

// development mode flow
if (process.env.NODE_ENV === 'development') {
  // set configs
  app.set('json spaces', 2)
  // show api version
  app.get('/', (req, res) => res.json({
    version
  }))
}

// load 3rd party middleware
app.use(cors())
app.use(morgan('common'))
app.use(parser.json()) // Parse HTTP JSON bodies
app.use(parser.urlencoded({ extended: true })) // Parse URL-encoded params

// other configs
app.disable('etag')
app.disable('x-powered-by')

// load routes in `controllers` folder into v1 group
router({ cwd: path.join(process.cwd(), 'src'), verbose: true })
  .when('controllers')
  .into(app)

// load routes and error on not found
app.all('/*', (req, res, next) => {
  const error = new Error('Could not find resource for current path')
  error.statusCode = 404
  error.reason = 'ENDPOINT_NOT_FOUND'
  next(error)
})

app.use(errorHandler())

export default app
