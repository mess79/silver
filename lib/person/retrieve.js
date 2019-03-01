const model = require("../../models/person")
const owner = require("../util/owner");
const retrieve = function(req) {
  return new Promise((resolve, reject) => {
    if (req.params.country && req.params.id) {
      model[req.params.country].findById(req.params.id)
        .then((result) => {
          if (!result) {
            reject(new Error("No data found"))
          } else {
            let authOwner = owner(req, result.account);
            if (result && authOwner && String(result.host) === req.user.host) {
              resolve(result);
            } else {
              reject(new Error("Account or Host not matched"))
            }
          }
        }).catch((err) => {
          reject(err)
        });

    } else {
      reject(new Error('Undefined country or ID'))
    }
  })
}
module.exports = retrieve;
