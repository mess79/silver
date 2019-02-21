const account = require("../../models/account");

const passwordResetHashCheck = function(user, hash) {
  return new Promise((resolve, reject) => {

    const query = {
      username: user
    }

    account.findOne(query)
      .then(function(result) {
        if (!result) {
          reject({
            message: "user not found"
          })
        } else {
          if (result.reset) {
            if (Date.now() < result.reset.exp && result.reset.hash === hash) {
              resolve(true)
            } else {
              reject({
                message: "hash not matched or exp in the past"
              })
            }
          } else {
            reject({
              message: "reset not found"
            })
          }
        }
      })
      .catch(function(err) {
        reject(err);
      })
  })
}

module.exports = passwordResetHashCheck;
