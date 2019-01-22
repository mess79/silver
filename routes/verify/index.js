// verify if user is logged on middleware
const fs = require('fs');
const jwt = require('../lib/jwt');
const verify = function(express) {
  const router = express.Router();
  const _ = require("lodash");

  const paths = [
    "/",
    "/index",
    "/login",
    "/register",
    "/logoff",
    "/favicon.ico"
  ]

  router.route(['/js/:jsfile', '/css/:cssfile', '/*'])
    .all(function(req, res, next) {
      let path = req.path;
      if (req.params.jsfile || req.params.cssfile){
        path = "/"
      }
      let = safe = _.indexOf(paths, path)
      if (safe !== -1){
      next()
      } else {
        let options = {
          audience: req.headers.host
        }
        let user = jwt.verify(req.cookies.authorization, options)
        if (user) {
          //console.log(user);
          //console.log(Date.now()/1000);
          //console.log("verified user")
          next()
        } else {
          if (req.xhr) {
            console.log("xhr verify fail");
            res.json({
              auth: "Verify failed"
            });
          } else {
            console.log("redirect");
            //res.redirect("./login")
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
