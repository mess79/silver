const auth = require("../../lib/auth/auth");
const account = require("../../models/account");
const jwt = require("../../lib/auth/jwt");

const register = function(express) {
  const router = express.Router();

  router.route('/register')
    .get(function(req, res, next) {
      res.render('login/register')
    })
    .post(function(req, res, next) {

      const send = function(xhr, auth, message, data, res){
        if (req.xhr){
          res.json({
            auth: auth,
            message : message,
            data: data
          })
        } else {
          res.render('login/register');
        }
      }

      if (req.body.password) {
        auth.create(req.body.password)
          .then((password) => {
            req.body.password = password
            account.find({
                username: req.body.username
              }).then(function(exist) {
                if (exist.length === 0) {
                  account.create(req.body)
                    .then(function(result) {
                      let options = {
                        audience: req.headers.host
                      }
                      let payload = {
                        subject: result._id
                      }
                      res.cookie('authorization', jwt.sign(payload, options), {
                        expires: new Date(Date.now() + 900000),
                        httpOnly: true
                      });
                      send(req.xhr, true, "registered and logged on", result, res)
                    })
                } else {
                  send(req.xhr, false, "user already exists", false, res)
                }
              })
              .catch(function(err) {
                console.log(err)
                send(req.xhr, false, "error registering user", false, res)
              })
          })
      }
    })

  return router;
}

module.exports = register;
