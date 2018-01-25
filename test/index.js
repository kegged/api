import chai, { expect } from 'chai'
import request from 'supertest'
import Mocha from 'mocha'
import { join } from 'path'

import app, { server } from '@'
import models from '@/models'
import * as helpers from '~/helpers'
import prepare from './prepare'

chai.use(require('chai-shallow-deep-equal'))

global.chai = chai
global.expect = expect
global.request = require('supertest')
global.app = app
global.server = server
global.helpers = helpers

const mocha = new Mocha()

prepare(() => {
  [
    'controllers/user',
    'teardown',
  ].forEach(f => mocha.addFile(join(__dirname, f)))

  mocha.run((failures) => {
    process.on('exit', () => process.exit(failures))
  })
})
