const all = function logErrors(err, req, res, next) {
  if (err.statusCode) {
    res.status = err.statusCode
  } else {
    res.status(500)
  }
  res.render('error/error', {
    error: err
  })
}

module.exports = all
