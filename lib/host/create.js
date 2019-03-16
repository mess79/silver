const model = require("../../models/host")
const _ = require("lodash");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const create = function(req) {
  return new Promise((resolve, reject) => {
    if (req.user && _.indexOf(["server_admin", "superuser"], req.user.role) !== -1) {
      permission_prune(req.user, req.body, permissions.create)
        .then((pruneResult) => {
          model.create(pruneResult)
            .then((result) => {
              if (!result) {
                reject(new Error("error creating host"))
              } else {
                resolve(result);
              }
            }).catch((err) => {
              reject(err)
            });
        })
        .catch((err) => {
          reject(err);
        })
    } else {
      reject(new Error('User missing or user role not high enough'))
    }
  })
}
module.exports = create;
