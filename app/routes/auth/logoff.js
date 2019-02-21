const send = require('../../lib/util/send')

const logoff = function(express) {
  const router = express.Router();
  //const _ = require("lodash");
  router.route('/logoff')
    .get(function(req, res, next) {
      res.clearCookie('authorization')
      res.clearCookie('csrf')
      //res.clearCookie('sessionID')
      //res.render('auth/logoff')
      send(req, res, next, {
        message: "logged off",
        data: false,
        url: "auth/logoff"
      })
    })
    .post(function(req, res, next) {
      res.clearCookie('authorization')
      res.clearCookie('csrf')
      send(req, res, next, {
        message: "logged off",
        data: false,
        url: "auth/logoff"
      })
    })
  return router;
}

module.exports = logoff;
