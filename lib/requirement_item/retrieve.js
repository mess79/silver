const model = require("../../models/requirementsItem");
const owner = require("../util/owner");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const retrieve = function(req) {
  return new Promise((resolve, reject) => {
    model.findById(req.params.id)
      .lean()
      .then((result) => {
        if (!result) {
          reject(new Error("No data found"))
        } else {
          if (!result) {
            reject(new Error("No data found"))
          } else {
            let authOwner = owner(req, result, true);
            if (result && authOwner) {
              permission_prune(req.user, result, permissions.retrieve)
                .then((result) => {
                  resolve(result);
                });
            } else {
              if (!authOwner) {
                reject(new Error("Not authorised to view this requirement item"))
              } else {
                reject(new Error("No data found"))
              }
            }
          }
        }
      })
      .catch((err) => {
        reject(err)
      });
  })
}
module.exports = retrieve;
