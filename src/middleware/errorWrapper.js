import * as errors from '@/errors'
import * as sequelizeErrors from 'sequelize/lib/errors'

export default (err, req, res, next) => {
  let $err = err
  if (err instanceof sequelizeErrors.UniqueConstraintError) {
    $err = errors.UniqueConstraintError(err.fields[0] || 'field')
  }
  next($err)
}
