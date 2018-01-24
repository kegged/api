import jwt from 'jsonwebtoken'

export default async (req, res, next) => {
  const token = req.get('Authorization').split('Bearer').pop().trim()
  const payload = jwt.verify(token, 'secret')
  // token was invalid; throw unauthorized
  if (!Object.keys(payload).length) {
    const err = new Error('Unauthorized')
    err.status = 401
    return next(err)
  }
  // mount payload to request object
  req.user = payload
  next()
}
