const model = require("../../models/account")
const _ = require("lodash");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const create = function(req) {
  return new Promise((resolve, reject) => {
    let original_role = req.body.role;
    permission_prune(req.user, req.body, permissions.create)
      .then((pruneResult) => {
        pruneResult.host = req.user.host
        let exists = _.indexOf(pruneResult.account, req.user.subject);
        if (exists < 0) {
          if (!pruneResult.account || pruneResult.account.length === 0) {
            pruneResult.account = [];
          }
          pruneResult.account.push(req.user.subject)
        }
        pruneResult.role = "client";
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
        model.create(pruneResult)
          .then((result) => {
            if (!result) {
              reject(new Error("error creating order"))
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
  })
}
module.exports = create;
