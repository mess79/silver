const account = require("../../models/account");
const argon = require("./auth");

const passwordReset = function(user, hash, password) {
  return new Promise((resolve, reject) => {

    const query = {
      username: user
    }

    /*const update = {

    }*/

    const options = {
      new: true
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

              argon.create(password)
                .then(function(passwordObj) {
                  result.password = passwordObj
                  result.reset.exp = Date.now()
                  result.save()
                    .then(function(data) {
                      console.log(data);
                      resolve(true);

                    })
                    .catch(function(err) {
                      reject(err);
                    })
                })
                .catch(function(err) {
                  reject(err);
                })
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

module.exports = passwordReset;
