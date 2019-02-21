const account = require("../../models/account");
const cryptoRandomString = require('crypto-random-string');
const Email = require('email-templates');
const emailConfig = require("../../config").email;
const urlConfig = require("../../config").url;
const email = new Email(emailConfig);
//const path = require("path");

const reset = function(user, host) {
  return new Promise((resolve, reject) => {

    const resetHash = {
      reset: {
        hash: cryptoRandomString(256),
        exp: Date.now() + 15 * 60 * 1000
      }
    }
    const query = {
      username: user
    }
    const options = {
      new: true
    }

    account.findOneAndUpdate(query, resetHash, options)
      .then(function(result) {
        let locals = {
          hash: result.reset.hash,
          firstname: result.first_name,
          user: result.username,
          link: urlConfig.protocol+host+"/reset/"+result.username+"/"+result.reset.hash
        }
        email
          .send({
            template: 'passwordReset',
            message: {
              to: result.username
            },
            locals: locals
          })
          .then(function() {
            resolve({send:true});
          })
          .catch(function(err) {
            reject(err);
          });
      })
      .catch(function(err) {
        reject(err);
      })
  })
}

module.exports = reset;
