import { PostController } from '@/controllers'

const posts = [
  // valid
  {
    title: 'foo',
    content: 'bar',
    userId: 1,
  },
  // valid
  {
    title: 'foo',
    content: 'bazz',
  },
  // invalid
  {
    breweryId: 5,
    userId: 1,
  }
]

const validPosts = [posts[0], posts[1]]

describe('POST /posts', () => {
  it('should create a new post', done => {
    request(app)
      .post('/posts')
      .type('json')
      .set('Authorization', adminToken)
      .send(posts[0])
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.newPost).to.shallowDeepEqual(posts[0])
        done()
      })
  })

  it('should infer the userId and create a new post', done => {
    request(app)
      .post('/posts')
      .type('json')
      .set('Authorization', adminToken)
      .send(posts[1])
      .expect(201)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.newPost).to.shallowDeepEqual({ ...posts[1], userId: 1 })
        done()
      })
  })

  it('should throw bad request when title and content not submitted',  done => {
    request(app)
      .post('/posts')
      .type('json')
      .set('Authorization', adminToken)
      .send(posts[2])
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe('GET /posts', () => {
  it('should get all posts', done => {
    request(app)
      .get('/posts')
      .type('json')
      .set('Authorization', adminToken)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})

describe('PUT /posts/:id/:name', () => {
  it('should throw bad request when attemplting to change userId')

  it('should allow the user to update the post')
})

describe('GET /posts/:id/:name', () => {
  it('should allow the user to see the post')
})

describe('DELETE /posts/:id/:name', () => {
  it('should allow the user to delete the post')
})
