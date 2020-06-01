const model = require("../../models/person")
const permissions = require("./permissions");
const permission_prune = require("../util/permission_prune");
const _ = require("lodash");
const create = function(req) {
  return new Promise((resolve, reject) => {

    if (req.params.origin_country && req.body) {
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
          model[req.params.origin_country].create(pruneResult)
            .then((result) => {
              if (!result) {
                reject(new Error("No data found"))
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
      reject(new Error('Undefined country or no data'))
    }
  })
}
module.exports = create;
