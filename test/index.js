import chai, { expect } from 'chai'
import request from 'supertest'

import app, { server } from '@'
import * as helpers from '~/helpers'

// setup globals
global.chai = chai
global.expect = expect
global.request = require('supertest')
global.app = app
global.server = server
global.helpers = helpers

chai.use(require('chai-shallow-deep-equal'))

// tests
require('./controllers/user')
require('./teardown')
