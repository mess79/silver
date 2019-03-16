const model = require("../../models/account");
const owner = require("../util/owner");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const update = function(req) {
  return new Promise((resolve, reject) => {
    if (req.params.id) {
      model.findById(
          req.params.id
        )
        .lean()
        .then((result) => {
          let authOwner = owner(req, result, true);
          if (result && authOwner) {
            let original_role = req.body.role;
            permission_prune(req.user, req.body, permissions.update)
              .then((pruneResult) => {
                switch (req.user.role) {
                  case "company_admin":
                    if (original_role === "manager" || original_role === "consultant") {
                      pruneResult.role = original_role
                    }
                    break;
                  case "server_admin":
                    if (original_role === "manager" || original_role === "consultant" || original_role === "company_admin") {
                      pruneResult.role = original_role
                    }
                    break;
                  case "superuser":
                    pruneResult.role = original_role
                    break;
                }
                model.findByIdAndUpdate(
                    req.params.id, pruneResult, {
                      new: true
                    })
                  .then((saveResult) => {
                    resolve(saveResult);
                  })
              });
          } else {
            if (!authOwner) {
              reject(new Error("Not authorised to update this order"))
            } else {
              reject(new Error("No data found"))
            }
          }
        }).catch((err) => {
          reject(err)
        });
    } else {
      reject(new Error('Undefined order number'))
    }
  })
}
module.exports = update;
