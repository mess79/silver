const model = require("../../models/requirementsItem");
const owner = require("../util/owner");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const update = function(req) {
  return new Promise((resolve, reject) => {
    permission_prune(req.user, req.body, permissions.update)
      .then((pruneResult) => {
        model.findByIdAndUpdate(req.params.id, pruneResult, {
            new: true
          })
          .then((saveResult) => {
            console.log(saveResult);
            let authOwner = owner(req, true, true);
            if (saveResult && authOwner) {
              if (!saveResult) {
                reject(new Error("error updating requirement item"))
              } else {
                resolve(saveResult);
              }
            } else {
              if (!authOwner) {
                reject(new Error("Not authorised to update this requirement item"))
              } else {
                reject(new Error("No data found"))
              }
            }
          })
          .catch((err) => {
            reject(err)
          });
      })
      .catch((err) => {
        reject(err)
      });
  })
}
module.exports = update;
