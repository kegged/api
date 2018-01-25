import chai, { expect } from 'chai'
import request from 'supertest'

import app, { server } from '@'
import models from '@/models'
import { generateHash } from '@/utils'
import * as helpers from '~/helpers'

(async () => {
  const { salt, hash } = await generateHash('password')
  global.admin = await models.User.create({
    userName: 'admin',
    email: 'admin@admin.admin',
    firstName: 'admin',
    lastName: 'admin',
    isAdmin: true,
    salt,
    hash
  })
})()

// setup globals
global.chai = chai
global.expect = expect
global.request = require('supertest')
global.app = app
global.server = server
global.helpers = helpers

chai.use(require('chai-shallow-deep-equal'))
