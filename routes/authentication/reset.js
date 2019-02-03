const resetCheck = require("../../lib/auth/passwordResetHashCheck")
const resetPassword = require("../../lib/auth/passwordResetPasswordUpdate")

const reset = function(express) {
  const router = express.Router();
  router.route('/reset/:user/:hash')
    .get(function(req, res, next) {
      resetCheck(req.params.user, req.params.hash)
      .then(function(result) {
        res.render("login/reset_password");
      })
      .catch(function(err) {
        next(err);
      })
    })
    .post(function(req, res, next) {
      resetPassword(req.params.user, req.params.hash, req.body.password)
      .then(function(result) {
        res.render("login/reset_password_submitted");
      })
      .catch(function(err) {
        next(err);
      })
    })
  return router;
}

module.exports = reset;
