const model = require("../../models/person")
const owner = require("../util/owner");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const retrieve = function(req) {
  return new Promise((resolve, reject) => {
    if (req.params.country && req.params.id) {
      model[req.params.country].findById(req.params.id)
        .lean()
        .then((result) => {
          if (!result) {
            reject(new Error("No data found"))
          } else {
            let authOwner = owner(req, result);
            if (result && authOwner) {
              permission_prune(result, permissions.retrieve)
                .then((result) => {
                  resolve(result);
                });
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
