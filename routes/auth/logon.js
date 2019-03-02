const auth = require("../../lib/auth/auth");
const account = require("../../models/account");
const host = require("../../models/host");
const jwt = require("../../lib/auth/jwt");
const csrf = require('csrf');
const send = require('../../lib/util/send');
const cryptoRandomString = require('crypto-random-string');

const logon = function(express) {
  const router = express.Router();
  router.route(['/logon', '/login'])
    .get(function(req, res, next) {
      send(req, res, next, {
        message: "login page",
        data: false,
        url: "auth/login"
      })
    })
    .post(function(req, res, next) {

      if (req.body.username && req.body.password) {
        account.findOneAndUpdate({
            username: req.body.username
          }, {
            csrf_hash: cryptoRandomString(32)
          }, {
            new: true
          })
          .lean()
          .then(function(result) {
            if (!result) {
              console.log("no user found: " + req.body.username)
            } else {

              auth.verify(req.body.password, result.password).then((verified) => {
                if (verified) {

                  host.findOne({
                      "host": req.headers.host
                    })
                    .then(function(hostResult) {
                      let options = {
                        audience: req.headers.host
                      }
                      let payload = {
                        subject: result._id,
                        processing_company: result.processing_company,
                        hash: result.csrf_hash,
                        role: result.role,
                        company: result.company,
                        host: String(hostResult._id)
                      }
                      let jwt_token = jwt.sign(payload, options)
                      res.cookie('authorization', jwt_token, {
                        expires: new Date(Date.now() + 3600000),
                        httpOnly: true
                      });

                      let csrfTokens = new csrf()
                      let token = csrfTokens.create(String(payload.hash))
                      res.cookie('csrf', token, {
                        expires: new Date(Date.now() + 3600000),
                      });
                      send(req, res, next, {
                        message: "logged on",
                        data: result,
                        url: "auth/login"
                      })
                    })
                    .catch(function(err) {
                      console.log(err)
                      send(req, res, next, {
                        message: "host domain not found",
                        data: false,
                        url: "auth/login"
                      })
                    })
                } else {
                  send(req, res, next, {
                    message: "login failed",
                    data: false,
                    url: "auth/login"
                  })
                }
              })
            }
          })
          .catch(function(err) {
            console.log(err)
            send(req, res, next, {
              message: "login failed",
              data: false,
              url: "auth/login"
            })
          })
      } else {
        send(req, res, next, {
          message: "login failed",
          data: false,
          url: "auth/login"
        })
      }
    })

  return router;
}

module.exports = logon;
