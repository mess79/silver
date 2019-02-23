const account = require("../../models/account");

const user = {
  read: function(req) {
    return new Promise((resolve, reject) => {
      account.findById(req.user.subject)
        .then(function(result) {
          resolve(result);
        })
        .catch(function(err) {
          reject(err);
        })
    })
  },
  write: function(req, data) {
    return new Promise((resolve, reject) => {
      account.findByIdAndUpdate(req.user.subject, data, {new:true})
        .then(function(result) {
          resolve(result);
        })
        .catch(function(err) {
          reject(err);
        })
    })
  }
}

module.exports = user;
