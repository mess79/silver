const logoff = function(express) {
  const router = express.Router();
  //const _ = require("lodash");
  router.route('/logoff')
    .get(function(req, res, next) {
      res.clearCookie('authorization')
      res.clearCookie('csrf')
      //res.clearCookie('sessionID')
      res.render('logoff')
    })
    .post(function(req, res, next) {
      res.clearCookie('authorization')
      res.clearCookie('csrf')
      //res.clearCookie('sessionID')
      if (req.xhr) {
        res.json({
          auth: false,
          message : "Logged off"
        })
      } else {
        res.render('logoff')
      }
    })
  return router;
}

module.exports = logoff;
