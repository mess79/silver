const account = require("../../models/account");
const cryptoRandomString = require('crypto-random-string');
const Email = require('email-templates');
const emailConfig = require("../../config").email;
const urlConfig = require("../../config").url;
const email = new Email(emailConfig);

const activate = function(user, host) {
  return new Promise((resolve, reject) => {

    const activateHash = {
      active: false,
      activation: {
        hash: cryptoRandomString({length:256}),
        exp: Date.now() + 15 * 60 * 1000
      }
    }
    const query = {
      username: user
    }
    const options = {
      new: true
    }

    account.findOneAndUpdate(query, activateHash, options)
      .then(function(result) {
        let locals = {
          hash: result.activation.hash,
          firstname: result.first_name,
          user: result.username,
          link: urlConfig.protocol + host + "/activation_request/" + result.username + "/" + result.activation.hash
        }
        email
          .send({
            template: 'activationReset',
            message: {
              to: result.username
            },
            locals: locals
          })
          .then(function() {
            resolve({
              send: true
            });
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

module.exports = activate;
