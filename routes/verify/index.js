// verify if user is logged on middleware
const fs = require('fs');
const jwt = require('../../lib/auth/jwt');
const csrf = require('csrf');

const verify = function(express) {
  const router = express.Router();
  const _ = require("lodash");

  const paths = [
    "/",
    "/index",
    "/login",
    "/register",
    "/logoff",
    "/reset/*",
    "/reset_submit",
    "/reset_request",
    "/favicon.ico"
  ]

  router.route(['/js/:jsfile', '/css/:cssfile', '/*'])
    .all(function(req, res, next) {
      let path = req.path;
      if (req.params.jsfile || req.params.cssfile) {
        path = "/"
      }

      let pathSplit = path.split("/")
      if(pathSplit.length > 2){
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
        let csrfTokens = new csrf()
        let csrfCheck = csrfTokens.verify(user.hash, req.cookies.csrf)
        //console.log(csrfCheck);
        if (user && csrfCheck) {
          req.user = user;
          let timeLeft = user.exp - Date.now() / 1000;
          //if jwt expires within the next 15 mins - set a new ne
          //console.log(timeLeft);
          if (timeLeft < 900) {

            let options = {
              audience: user.aud
            }
            let payload = {
              subject: user.subject,
              permissions: user.permissions,
              company: user.company,
              people: user.person
            }
            let jwt_token = jwt.sign(payload, options)

            res.cookie('authorization', jwt_token, {
              expires: new Date(Date.now() + 3600000),
              httpOnly: true
            });

            let token = csrfTokens.create(payload.hash)
            res.cookie('csrf', token, {
              expires: new Date(Date.now() + 3600000),
            });
            console.log("JWT replaced")
          }
          next()
        } else {
          if (req.xhr) {
            console.log("xhr verify fail");
            res.json({
              auth: "Verify failed"
            });
          } else {
            console.log("redirect");
            res.status(500).send("Unauthorized");
          }
        }
      }
    })

  return {
    verify: router
  };
}

module.exports = verify;
