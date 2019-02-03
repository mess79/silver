const auth = require("../../lib/auth/auth");
const account = require("../../models/account");
const jwt = require("../../lib/auth/jwt");
const csrf = require('csrf')

const logon = function(express) {
  const router = express.Router();

  router.route(['/logon', '/login'])
    .get(function(req, res, next) {
      res.render('login/login')
    })
    .post(function(req, res, next) {
      const send = function(xhr, auth, message, data, res) {
        if (req.xhr) {
          res.json({
            auth: auth,
            message: message,
            data: data
          })
        } else {
          res.render('login/login');
        }
      }

      if (req.body.username && req.body.password) {
        account.findOne({
            username: req.body.username
          })
          .lean()
          .then(function(result) {
            if (!result) {
              console.log("no user found: " + req.body.username)
            } else {
              auth.verify(req.body.password, result.password).then((verified) => {
                if (verified) {
                  let options = {
                    audience: req.headers.host
                  }
                  let payload = {
                    subject: result._id,
                    permissions: result.permissions,
                    company: result.company,
                    people: result.person
                  }
                  let jwt_token = jwt.sign(payload, options)
                  res.cookie('authorization', jwt_token, {
                    expires: new Date(Date.now() + 3600000),
                    httpOnly: true
                  });

                  let csrfTokens = new csrf()
                  let token = csrfTokens.create(String(payload.subject))
                  res.cookie('csrf', token, {
                    expires: new Date(Date.now() + 3600000),
                  });
                  send(req.xhr, true, "logged on", result, res)
                } else {
                  send(req.xhr, false, "login failed", false, res)
                }
              })
            }
          })
          .catch(function(err) {
            console.log(err)
            send(req.xhr, false, "login failed", false, res)
          })
      } else {
        send(req.xhr, false, "login failed", false, res)
      }
    })

  return router;
}

module.exports = logon;
