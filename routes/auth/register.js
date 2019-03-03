const auth = require("../../lib/auth/auth");
const account = require("../../models/account");
const jwt = require("../../lib/auth/jwt");
const send = require('../../lib/util/send');
const csrf = require('csrf');
const host = require("../../models/host");
const company = require("../../models/company");
const cryptoRandomString = require('crypto-random-string');
const activate = require("../../lib/auth/activate");

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
                  req.body.host = hostResult
                  resolve(req)
                })
            })
          })
          .then(function(req) {
            return new Promise((resolve, reject) => {
              req.body.activation = {
                hash: cryptoRandomString(256),
                exp: Date.now() + 15 * 60 * 1000
              }
              req.body.active = false;
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
            activate(req.body.username, req.headers.host)
            send(req, res, next, {
              message: "registered sending activation email",
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
