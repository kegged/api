import chai, { expect } from 'chai'
import request from 'supertest'

import app from '@'
import * as helpers from '~/helpers'

global.chai = chai
global.expect = expect
global.request = require('supertest')
global.app = app
global.helpers = helpers

chai.use(require('chai-shallow-deep-equal'))

require('./controllers/user')
