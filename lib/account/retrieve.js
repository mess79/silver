const model = require("../../models/account");
//const user = require("../util/user");
const owner = require("../util/owner");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const retrieve = function(req) {
  return new Promise((resolve, reject) => {
    if (req.params.id) {
      model.findById(req.params.id)
        .lean()
        .then((result) => {
          let authOwner = owner(req, result, true);
          if (result && authOwner) {
            permission_prune(req.user, result, permissions.retrieve)
              .then((result) => {
                resolve(result);
              });
          } else {
            if (!authOwner) {
              reject(new Error("Not authorised to view this account"))
            } else {
              reject(new Error("No data found"))
            }
          }
        }).catch((err) => {
          reject(err)
        });
    } else {
      reject(new Error('Undefined ID'))
    }
  })
}
module.exports = retrieve;
