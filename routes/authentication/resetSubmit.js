const reset = require("../../lib/auth/passwordReset");

const resetRequest = function(express) {
  const router = express.Router();
  router.route('/reset_submit')
    .post(function(req, res, next) {
      // async password reset - no need to wait for it to finish
      reset(req.body.username, req.headers.host)
        .then(function(result) {
          console.log(result)
        })
        .catch(function(err) {
          console.log(err)
        })
      res.render('login/reset_submit')
    })
  return router;
}

module.exports = resetRequest;
