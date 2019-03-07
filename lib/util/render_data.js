const host = require("../../models/host")
const company = require("../../models/company")
const account = require("../../models/account")

const render_data = function(req) {

  const host_promise = function() {
    return new Promise((resolve, reject) => {
      if (req.user.host) {
        host.findById(req.user.host)
          .then(function(result) {
            resolve(result);
          })
          .catch(function(err) {
            reject(err)
          })
      } else {
        host.findOne({
            "host": req.headers.host
          })
          .then(function(result) {
            resolve(result);
          })
          .catch(function(err) {
            reject(err)
          })
      }
    })
  }

  const company_promise = function() {
    return new Promise((resolve, reject) => {
      if (req.user.company) {

        company.findById(req.user.company)
          .then(function(result) {
            if (!result) {
              result = false;
            }
            resolve(result);
          })
          .catch(function(err) {
            reject(err)
          })
      } else {
        resolve(false);
      }
    })
  }

  const processing_company_promise = function() {
    return new Promise((resolve, reject) => {
      if (req.user.company) {

        company.findById(req.user.processing_company)
          .then(function(result) {
            if (!result) {
              result = false;
            }
            resolve(result);
          })
          .catch(function(err) {
            reject(err)
          })
      } else {
        resolve(false);
      }
    })
  }

  const account_promise = function() {
    return new Promise((resolve, reject) => {
      if (req.user.subject) {

        account.findById(req.user.subject)
          .then(function(result) {
            if (!result) {
              result = false;
            }
            resolve(result);
          })
          .catch(function(err) {
            reject(err)
          })
      } else {
        resolve(false);
      }
    })
  }



  return new Promise((resolve, reject) => {
    Promise.all([
        host_promise(),
        account_promise(),
        company_promise(),
        processing_company_promise()
      ])
      .then(function(values) {
        resolve(values);
      });
  })
}

module.exports = render_data
