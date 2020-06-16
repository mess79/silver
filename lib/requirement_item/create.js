const model = require("../../models/requirementsItem")
const owner = require("../util/owner");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const create = function(req) {
  return new Promise((resolve, reject) => {
    let authOwner = owner(req, true, true);
    if (authOwner) {
      permission_prune(req.user, req.body, permissions.create)
        .then((pruneResult) => {
          model.create(pruneResult)
            .then((result) => {
              if (!result) {
                reject(new Error("error creating requirement item"))
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
        .catch((err) => {
          reject(err)
        });
    } else {
      reject(new Error("Not authorised to high enough level to create Requiremant Item documents"))
    }
  })
}
module.exports = create;
