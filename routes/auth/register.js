const auth = require("../../lib/auth/auth");
const account = require("../../models/account");
const jwt = require("../../lib/auth/jwt");
const send = require('../../lib/util/send')

const register = function(express) {
  const router = express.Router();

  router.route('/register')
    .get(function(req, res, next) {
      send(req, res, next, {
        message: "register page",
        data: false,
        url: "auth/register"
      })
      //res.render('auth/register')
    })
    .post(function(req, res, next) {
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
                      send(req, res, next, {
                        message: "registered and logged on",
                        data: result,
                        url: "auth/register"
                      })
                    })
                } else {
                  send(req, res, next, {
                    message: "user already exists",
                    data: false,
                    url: "auth/register"
                  })
                }
              })
              .catch(function(err) {
                console.log(err)
                send(req, res, next, {
                  message: "error registering user",
                  data: false,
                  url: "auth/register"
                })
              })
          })
      }
    })
  return router;
}

module.exports = register;
