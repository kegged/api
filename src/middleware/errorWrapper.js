import * as errors from '@/errors'

import * as sequelizeErrors from 'sequelize/lib/errors'

export default (err, req, res, next) => {
  let $err = err
  // wrap sequelize errors
  if (err instanceof sequelizeErrors.BaseError) {
    if (err instanceof sequelizeErrors.UniqueConstraintError) {
      console.log('err => ', err.fields)
      $err = new errors.UniqueConstraintError(Object.keys(err.fields)[0] || 'field')
    }
  // wrap joi errors
  } else if (err.isJoi) {
    $err = new errors.ValidationError(err.details[0].message)
  }

  next($err)
}
