const auth = require("../lib/auth");
const account = require("../../models/account");
const jwt = require("../lib/jwt");

const register = function(express) {
  const router = express.Router();

  router.route('/register')
    .get(function(req, res, next) {
      res.render('register')
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
          res.render('register');
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
                      //res.render('register')
                    })
                } else {
                  send(req.xhr, false, "user already exists", false, res)
                  //res.render('register')
                }
              })
              .catch(function(err) {
                console.log(err)
                send(req.xhr, false, "error registering user", false, res)
                //res.render('register')
              })
          })
      }
    })

  return router;
}

module.exports = register;
