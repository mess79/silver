const xhr = function logErrors(err, req, res, next) {
  if (req.xhr) {
    let message = "unknown failure";
    switch (err.type) {
      case "entity.parse.failed":
        message = "No data to parse"
        break;
    }
    res.status(500).send({
      error: message
    })
  } else {
    next(err)
  }
}

module.exports = xhr
