const auth = require("../../lib/auth/auth");
const account = require("../../models/account");
const jwt = require("../../lib/auth/jwt");
const send = require('../../lib/util/send');
const csrf = require('csrf');
const host = require("../../models/host");
const company = require("../../models/company");
const cryptoRandomString = require('crypto-random-string');

const register = function(express) {
  const router = express.Router();

  router.route('/register')
    .get(function(req, res, next) {
      send(req, res, next, {
        message: "register page",
        data: false,
        url: "auth/register"
      })
    })
    .post(function(req, res, next) {
      if (req.body.password) {
        auth.create(req.body.password)
          .then((password) => {
            req.body.password = password
            return (req)
          })
          .then(function(req) {
            return new Promise((resolve, reject) => {
              account.find({
                  username: req.body.username
                })
                .then(function(exist) {
                  if (exist.length === 0) {
                    req.body.csrf_hash = cryptoRandomString(32);
                    req.body.role = "client";
                    resolve(req)
                  } else {
                    reject(new Error("user already exists"))
                  }
                })
            })
          })
          .then(function(req) {
            return new Promise((resolve, reject) => {
              host.findOne({
                  "host": req.headers.host
                })
                .then(function(hostResult) {
                  req.hostResult = hostResult
                  resolve(req)
                })
            })
          })
          .then(function(req) {
            return new Promise((resolve, reject) => {
              account.create(req.body)
                .then(function(result) {
                  req.result = result
                  resolve(req)
                })
            })
          })
          .then(function(req) {
            if (req.cookies.company) {
              req.result.company = req.cookies.company
            }
            let domain = req.body.username.replace(/.*@/, "");
            return new Promise((resolve, reject) => {
              company.findOne({
                  "domain": domain
                })
                .then(function(domainResult) {
                  if (domainResult) {
                    req.result.company = domainResult._id
                  }
                  resolve(req)
                })
            })
          })
          .then(function(req) {
            let options = {
              audience: req.headers.host
            }
            let payload = {
              subject: req.result._id,
              /*processing_company: result.processing_company
              procesing company can be updated later once the profile is set up.
              or maybe check the email domain againt the host to see.
              */
              hash: req.result.csrf_hash,
              role: req.result.role,
              company: req.result.company,
              host: String(req.hostResult._id)
            }
            res.cookie('authorization', jwt.sign(payload, options), {
              expires: new Date(Date.now() + 900000),
              httpOnly: true
            });
            let csrfTokens = new csrf()
            let token = csrfTokens.create(String(payload.hash))
            res.cookie('csrf', token, {
              expires: new Date(Date.now() + 3600000),
            });
            send(req, res, next, {
              message: "registered and logged on",
              data: req.result,
              url: "auth/register"
            })
          })
          .catch(function(err) {
            console.log(err.message)
            let message = "error registering user";
            if (err.message === "user already exists") {
              message = "user already exists"
            }
            send(req, res, next, {
              message: message,
              data: false,
              url: "auth/register"
            })
          })
      } else {
        send(req, res, next, {
          message: "no password was entered",
          data: false,
          url: "auth/register"
        })
      }
    })
  return router;
}

module.exports = register;
