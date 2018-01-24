export default (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Something broke ):'
  const body = { status, message, error: true }

  const isServerError = status >= 500

  if (isServerError) console.error(err)

  if (isServerError && process.NODE_ENV !== 'production') {
    return res.status(status).json({ ...body, stack: err.stack })
  }

  res.send(status).json(body)
  
  res.status(status)
}
