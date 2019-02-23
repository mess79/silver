const resetCheck = require("../../lib/auth/passwordResetHashCheck");
const resetPassword = require("../../lib/auth/passwordResetPasswordUpdate");
const send = require('../../lib/util/send');

const reset = function(express) {
  const router = express.Router();
  router.route('/reset/:user/:hash')
    .get(function(req, res, next) {
      resetCheck(req.params.user, req.params.hash)
      .then(function(result) {
        send(req, res, next,{
          message: "reset password",
          data: false,
          url: "auth/reset_password"
        })
      })
      .catch(function(err) {
        next(err);
      })
    })
    .post(function(req, res, next) {
      resetPassword(req.params.user, req.params.hash, req.body.password)
      .then(function(result) {
        send(req, res, next, {
          message: "reset password submitted",
          data: false,
          url: "auth/reset_password_submitted"
        })
      })
      .catch(function(err) {
        next(err);
      })
    })
  return router;
}

module.exports = reset;
