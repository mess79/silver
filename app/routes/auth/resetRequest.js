const reset = require("../../lib/auth/passwordReset");
const send = require('../../lib/util/send')

const resetRequest = function(express) {
  const router = express.Router();
  router.route('/reset_request')
    .get(function(req, res, next) {
      send(req, res, next, {
        message: "reset request",
        data: false,
        url: "auth/reset_request"
      })
      //res.render('auth/reset_request')
    })
    .post(function(req, res, next) {
      // async password reset - no need to wait for it to finish
      reset(req.body.username, req.headers.host)
        .then(function(result) {
          //console.log(result)
          send(req, res, next, {
            message: "reset request submitted",
            data: false,
            url: "auth/reset_request_submitted"
          })
        })
        .catch(function(err) {
          //console.log(err)
          next(err);
        })


      //res.render('auth/reset_request_submitted')
    })
  return router;
}

module.exports = resetRequest;
