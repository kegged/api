import chai, { expect } from 'chai'
import request from 'supertest'

chai.use(require('chai-shallow-deep-equal'))

import app from '@'
import { UserController } from '@/controllers'

const userBuffer1 = {
  email: 'charlesc.kenney@gmail.com',
  userName: 'charles',
  passWord: 'password',
  firstName: 'Charles',
  lastName: 'Kenney',
}

const userBuffer2 = {
  email: 'email@gmail.com',
  firstName: 'Not Charles',
  lastName: 'Not Kenney',
}

const userBuffer3 = {
  email: 'copfoej@gmail.com',
  userName: 'crgwjopwejf',
  passWord: 'efiheifhie',
  firstName: 'ejfojeof',
  lastName: 'ekfjowjefo',
}

const validUsers = [userBuffer1, userBuffer3]

function omitPassword(userBuffer) {
  const cp = { ...userBuffer }
  delete cp.passWord
  return cp
} 

describe('POST /users', () => {
  it('should create a user and respond with {newUser, token} and status 201', done => {
    request(app)
      .post('/users')
      .type('json')
      .send(JSON.stringify(userBuffer1).trim())
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.newUser).to.shallowDeepEqual(omitPassword(userBuffer1))
        expect(res.body.hasOwnProperty('token'), true)
        done()
      })
  })

  it('should throw bad request when not recieving username + password', done => {
    request(app)
      .post('/users')
      .type('json')
      .send(JSON.stringify(userBuffer2).trim())
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it('should create user even with extra fields', done  => {
    request(app)
      .post('/users')
      .type('json')
      .send(JSON.stringify({ ...userBuffer3, foo: 'bar' }).trim())
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.newUser).to.shallowDeepEqual(omitPassword(userBuffer3))
        expect(res.body.hasOwnProperty('token'), true)
        done()
      })
  })
})

describe('GET /users', () => {
  it('should get all users', done => {
    request(app)
      .get('/users')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.users).to.shallowDeepEqual(validUsers.map(u => omitPassword(u)))
        done()
      })
  })
})

describe('PUT /users/:userName', () => {
  it('should fail because user is not an admin or current user')
})
