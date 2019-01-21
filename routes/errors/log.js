const log = function logErrors (err, req, res, next) {
  console.log("Caught error:")
  console.error(err)
  console.log("");
  next(err)
}

module.exports = log
