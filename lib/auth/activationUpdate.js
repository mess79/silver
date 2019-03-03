const account = require("../../models/account");

const activate = function(user, hash) {
  return new Promise((resolve, reject) => {
    const query = {
      username: user
    }
    account.findOne(query)
      .lean()
      .then(function(result) {
        if (result.activation.hash === hash && Date.now() < result.activation.exp) {
          result.active = true
          result.activation.hash = ""
          result.activation.exp = Date.now();
          return result
        } else {
          reject({
            message: "link expired"
          });
        }
      })
      .then(function(result) {
        account.findOneAndUpdate(query, result, {
            new: true
          })
          .then(function(finalResult) {
            resolve(finalResult);
          })
          .catch(function(err) {
            console.log(err)
            reject({
              message: "db error"
            })
          })
      })
      .catch(function(err) {
        console.log(err)
        reject(err)
      })
  })
}

module.exports = activate
