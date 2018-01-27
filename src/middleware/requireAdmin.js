import requireAuth from './requireAuth'
import * as errors from '@/errors'

export default [requireAuth, (req, res, next) => {
  return req.user.isAdmin ? next() : next(new errors.UnauthorizedError())
}]
