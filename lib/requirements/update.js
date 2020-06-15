const model = require("../../models/requirements");
const owner = require("../util/owner");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const update = function(req) {
  return new Promise((resolve, reject) => {
    permission_prune(req.user, req.body, permissions.update)
      .then((pruneResult) => {
        model.findOneAndUpdate({
            country_from: req.params.sending_country,
            country_to: req.params.receiving_country
          }, pruneResult, {
            new: true
          })
          .then((saveResult) => {
            let authOwner = owner(req, saveResult, true);
            if (saveResult && authOwner) {
              if (!saveResult) {
                reject(new Error("error creating requirements"))
              } else {
                resolve(saveResult);
              }
            } else {
              if (!authOwner) {
                reject(new Error("Not authorised to update this requirement"))
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
