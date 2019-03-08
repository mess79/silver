const send = require('../../lib/util/send')

const activated = function(express) {
  const router = express.Router();
  router.route('/activated')
    .all(function(req, res, next) {
      send(req, res, next, {
        message: "account activated",
        data: false,
        url: "auth/activated"
      })
    })
    return router
}

module.exports = activated
