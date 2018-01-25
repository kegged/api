import { UserController } from '@/controllers'

const { omitUserPassWord } = helpers

const users = [
  {
    email: 'charlesc.kenney@gmail.com',
    userName: 'charles',
    passWord: 'password',
    firstName: 'Charles',
    lastName: 'Kenney',
  },
  {
    email: 'email@gmail.com',
    firstName: 'Not Charles',
    lastName: 'Not Kenney',
  },
  {
    email: 'copfoej@gmail.com',
    userName: 'crgwjopwejf',
    passWord: 'efiheifhie',
    firstName: 'ejfojeof',
    lastName: 'ekfjowjefo',
  }
]

const tokens = []

const validUsers = [global.admin, users[0], users[2]]

describe('POST /users', () => {
  it('should create a user and respond with {newUser, token} and status 201', done => {
    request(app)
      .post('/users')
      .type('json')
      .send(JSON.stringify(users[0]).trim())
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.newUser).to.shallowDeepEqual(omitUserPassWord(users[0]))
        expect(res.body.hasOwnProperty('token'), true)
        tokens[1] = `Bearer ${res.body.token}`
        done()
      })
  })

  it('should throw bad request when not recieving username + password', done => {
    request(app)
      .post('/users')
      .type('json')
      .send(JSON.stringify(users[1]).trim())
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
      .send(JSON.stringify({ ...users[2], foo: 'bar' }).trim())
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.newUser).to.shallowDeepEqual(omitUserPassWord(users[2]))
        expect(res.body.hasOwnProperty('token'), true)
        tokens[3] = `Bearer ${res.body.token}`
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
        expect(res.body.users).to.shallowDeepEqual(validUsers.map(u => omitUserPassWord(u)))
        done()
      })
  })
})

describe('PUT /users/:userName', () => {
  it('should fail because user is not an admin or current user', done => {
    request(app)
      .put(`/users/${users[0].userName}`)
      .set('Authorization', tokens[3])
      .send({ userName: users[0].userName, passWord: users[0].passWord })
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it('should allow user to change profile', done => {
    request(app)
      .put(`/users/${users[2].userName}`)
      .set('Authorization', tokens[3])
      .send({ userName: 'foo' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.updatedUser).to.shallowDeepEqual({ ...omitUserPassWord(users[2]), userName: 'foo' })
        done()
      })
  })
})

describe('GET /users/:userName', () => {
  it('should allow user to see profile', done => {
    request(app)
      .get(`/users/${users[0].userName}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.user).to.shallowDeepEqual(omitUserPassWord(users[0]))
        done()
      })
  })
})

describe('DELETE /users/:userName', () => {
  it('should throw unauthorized when not admin or current user', done => {
    request(app)
      .delete('/users/non-existant')
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it('should allow user to delete', done => {
    request(app)
      .delete(`/users/${users[0].userName}`)
      .set('Authorization', tokens[1])
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.deletedUser).to.shallowDeepEqual(omitUserPassWord(users[0]))
        done()
      })
  })
})
