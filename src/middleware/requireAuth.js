import jwt from 'jsonwebtoken'

export default async (req, res, next) => {
  let payload
  try {
    const token = req.get('Authorization').split('Bearer').pop().trim()
    payload = jwt.verify(token, 'secret')
    // the token was invalid; throw error
    if (!Object.keys(payload).length) throw Error()
  } catch (e) {
    const err = new Error('unauthorizaed')
    err.status = 401
    return next(err)
  }
  // mount user to req
  req.user = payload
  next()
}
