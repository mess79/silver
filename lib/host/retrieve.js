const model = require("../../models/host");
const _ = require("lodash");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const retrieve = function(req) {
  return new Promise((resolve, reject) => {
    if (req.user && _.indexOf(["server_admin", "superuser"], req.user.role) !== -1) {
      model.findOne({
          name: req.params.name
        })
        .lean()
        .then((result) => {
          if (result) {
            permission_prune(req.user, result, permissions.retrieve)
              .then((result) => {
                resolve(result);
              });
          } else {
            reject(new Error("No data found"))
          }
        }).catch((err) => {
          reject(err)
        });
    } else {
      reject(new Error("Not authorised for this action"))
    }
  })
}
module.exports = retrieve;
