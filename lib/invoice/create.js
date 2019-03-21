const model = require("../../models/invoice")
const _ = require("lodash");
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const create = function(req) {
  return new Promise((resolve, reject) => {
    permission_prune(req.user, req.body, permissions.create)
      .then((pruneResult) => {
        pruneResult.host = req.user.host
        let exists = _.indexOf(pruneResult.account, req.user.subject);

        if (exists < 0) {
          if(!pruneResult.account || pruneResult.account.length===0){
            pruneResult.account= [];
          }
          pruneResult.account.push(req.user.subject)
        }
        model.create(pruneResult)
          .then((result) => {
            if (!result) {
              reject(new Error("error creating invoice"))
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
