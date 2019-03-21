const send = require('../../lib/util/send')
const host = require("../../models/host");
const activationUpdate = require("../../lib/auth/activationUpdate");
const jwt = require("../../lib/auth/jwt");
const csrf = require('csrf');

const activate = function(express) {
  const router = express.Router();
  router.route(['/activation_request', '/activation_request/:user/:hash'])
    .get(function(req, res, next) {
      if (!req.params.user || !req.params.hash) {
        send(req, res, next, {
          message: "activate request",
          data: false,
          url: "auth/activation_request"
        })
      } else {
        activationUpdate(req.params.user, req.params.hash)
          .then(function(result) {
            return new Promise((resolve, reject) => {
              host.findOne({
                  "host": req.headers.host
                })
                .then(function(hostResult) {
                  req.hostResult = hostResult
                  resolve(result)
                })
            })
          })
          .then(function(result) {
            let options = {
              audience: req.headers.host
            }
            let payload = {
              subject: result._id,
              /*processing_company: result.processing_company
              procesing company can be updated later once the profile is set up.
              or maybe check the email domain againt the host to see.
              */
              hash: result.csrf_hash,
              role: result.role,
              company: result.company,
              host: String(req.hostResult._id)
            }
            let cookieOptions = {
              expires: new Date(Date.now() + 3600000),
              httpOnly: true
            }
            if (process.env.NODE_ENV === "production") {
              cookieOptions.secure = true
            }
            res.cookie('authorization', jwt.sign(payload, options), cookieOptions);
            let csrfTokens = new csrf()
            let token = csrfTokens.create(String(payload.hash))
            res.cookie('csrf', token, {
              expires: new Date(Date.now() + 3600000),
            });

            send(req, res, next, {
              message: "logged on",
              data: result,
              url: "auth/activated"
            })

            //res.json(result)
          })
          .catch(function(err) {
            console.log(err)
            res.send(err);
          })

      }
    })
  //.post(function(req, res, next) {
  //res.clearCookie('authorization')
  //res.clearCookie('csrf')
  //res.clearCookie('sessionID')
  //if (req.xhr) {
  //res.json({
  //auth: false,
  //message : "Logged off"
  //})
  //} else {
  //res.render('logoff')
  //}
  //})
  return router;
}

module.exports = activate;
