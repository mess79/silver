const model = require("../../models/person")
const owner = require("../util/owner");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const retrieve = function(req) {
  return new Promise((resolve, reject) => {
    if (req.params.origin_country && req.params.id) {
      model[req.params.origin_country].findById(
          req.params.id
        )
        .lean()
        .then((result) => {
          if (!result) {
            reject(new Error("No data found"))
          } else {
            let authOwner = owner(req, result);
            if (result && authOwner) {
              permission_prune(req.user, result, permissions.retrieve)
                .then((result) => {
                  resolve(result);
                });
            } else {
              if (!authOwner) {
                reject(new Error("Not authorised to view this person"))
              } else {
                reject(new Error("No data found"))
              }
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
