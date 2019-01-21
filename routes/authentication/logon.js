const auth = require("../lib/auth");
const account = require("../../models/account");
const jwt = require("../lib/jwt");

const logon = function(express) {
  const router = express.Router();

  router.route(['/logon', '/login'])
    .get(function(req, res, next) {
      res.render('login')
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
          res.render('login');
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
                //console.log(verified);
                if (verified) {
                  let options = {
                    audience: req.headers.host
                  }
                  let payload = {
                    subject: result._id,
                    permissions : result.permissions,
                    company : result.company,
                    people : result.person
                  }
                  res.cookie('authorization', jwt.sign(payload, options), {
                    expires: new Date(Date.now() + 1800000),
                    httpOnly: true
                  });
                  send(req.xhr, true, "logged on", result, res)
                  //res.render('login')
                } else {
                  send(req.xhr, false, "login failed", false, res)
                  //res.render('login')
                }
              })
            }
          })
          .catch(function(err) {
            console.log(err)
            send(req.xhr, false, "login failed", false, res)
            //res.render('login')
          })
      } else {
        send(req.xhr, false, "login failed", false, res)
        //res.render('login')
      }
    })

  return router;
}

module.exports = logon;
