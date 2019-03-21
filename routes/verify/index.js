// verify if user is logged on middleware
const fs = require('fs');
const jwt = require('../../lib/auth/jwt');
const csrf = require('csrf');

const verify = function(express) {
  const router = express.Router();
  const _ = require("lodash");

  const paths = [
    "/",
    "/env",
    "/index",
    "/login",
    "/register",
    "/logoff",
    "/reset/*",
    "/reset_submit",
    "/reset_request",
    "/favicon.ico",
    "/activation_request",
    "/activation_request/*",
    "/js/*",
    "/css/*"
  ]

  router.route('/*')
    .all(function(req, res, next) {
      let path = req.path;
      let pathSplit = path.split("/")
      if (pathSplit.length > 2) {
        pathSplit[1] = pathSplit[1] + "/*";
      }
      path = "/" + pathSplit[1]
      let safe = _.indexOf(paths, path)
      if (safe !== -1) {
        next()
      } else {
        let options = {
          audience: req.headers.host
        }
        let user = jwt.verify(req.cookies.authorization, options)
        let csrfTokens = new csrf();
        let csrfHeadCheck = csrfTokens.verify(user.hash, req.headers.authorization);
        let csrfCheck = csrfTokens.verify(user.hash, req.cookies.csrf);

        req.user = user;
        if (
          user && // checks for JWT pass
          csrfCheck && // checks for csrf pass
          csrfHeadCheck === csrfCheck // checks csrf cookie is the same as the header authorisation
        ) {
          let timeLeft = user.exp - Date.now() / 1000;
          //if jwt expires within the next 15 mins - set a new ne
          if (timeLeft < 900) {
            options = {
              audience: user.aud
            }
            let payload = {
              subject: user.subject,
              permissions: user.permissions,
              company: user.company,
              people: user.person
            }
            let cookieOptions = {
              expires: new Date(Date.now() + 3600000),
              httpOnly: true
            }
            if (process.env.NODE_ENV === "production") {
              cookieOptions.secure = true
            }
            let jwt_token = jwt.sign(payload, options)
            res.cookie('authorization', jwt_token, cookieOptions);
            let token = csrfTokens.create(payload.hash)
            res.cookie('csrf', token, {
              expires: new Date(Date.now() + 3600000),
            });
            console.log("JWT replaced")
          }
          next()
        } else {
          let userBoo = user !== false
          let csrfBoo = csrfCheck !== false
          let csrfHeadBoo = csrfHeadCheck !== false
          console.log("Unauthorised request:");
          console.log("user:        " + userBoo);
          //console.log(user);
          console.log("csrf cookie: " + csrfBoo);
          console.log("csrf header: " + csrfHeadBoo)
          if (req.xhr) {
            res.json({
              auth: "Unauthorised to access this resource"
            });
          } else {
            next({
              statusCode: "500",
              message: "Unauthorised to access this resource"
            });
          }
        }
      }
    })
  return {
    verify: router
  };
}

module.exports = verify;
